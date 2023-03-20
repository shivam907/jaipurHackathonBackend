// SyncU
// https://syncu.me

const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, application/json"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static(path.join(__dirname, "public")));

const url = process.env.URL;

try {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected Successfully to the DataBase");
  app.listen(process.env.PORT || 3000);
} catch (err) {
  console.log(err);
}
