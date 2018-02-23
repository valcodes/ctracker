require("dotenv").config();
const express = require("express");

const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");

const Auth0Strategy = require("passport-auth0");
const controller = require("./controller");

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(
  session({
    secret: process.env.SECRET,
    resave: process.env.RESAVE,
    saveUninitialized: process.env.SAVEUNINITIALIZED
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(`${__dirname}/../build`));

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,

      callbackURL: process.env.AUTH0_CALLBACK_URL,
      scope: "openid profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByAuth([profile.id])
        .then(response => {
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get("/api/me", function(req, res) {
  if (!req.user) return res.status(404);
  res.status(200).json(req.user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
    failureFlash: true
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/getcoins", (req, res, next) => {
  axios
    .get("https://api.coinmarketcap.com/v1/ticker/?limit=0")
    .then(response => {
      return res.send(response.data);
    })
    .catch(console.log);
});

app.get("/api/getSingleCoin/:id", (req, res, next) => {
  axios
    .get(`https://api.coinmarketcap.com/v1/ticker/${req.params.id}`)
    .then(response => {
      return res.send(response.data);
    })
    .catch(console.log);
});

app.post("/api/portfolio", controller.create);
app.get("/api/favorites", controller.getFavs);
app.delete("/api/deleteCoin", controller.deleteFromPortfolio);

const path = require("path");

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
