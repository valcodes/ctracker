const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const axios = require("axios");
const session = require("express-session");
const passport = require("passport");

const port = 3001;

const app = express();

app.use(json());
app.use(cors());

app.get("/api/getcoins", (req, res, next) => {
  axios
    .get("https://api.coinmarketcap.com/v1/ticker/?limit=10")
    .then(response => {
      console.log(response.data);
      return res.send(response.data);
    })
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
