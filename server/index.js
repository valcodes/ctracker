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

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
