const User = require("../models/user");
require("dotenv").config();

const nodemailer = require("nodemailer");

const getUserData = async (req, res, next) => {
  try {
    const user = await User.find({});
    // await sendWelcomeEmail("m3passkarvado@gmail.com");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(402).send("ERROR");
  }
};
const postUserData = async (req, res, next) => {
  console.log("Hi");
  try {
    const user = new User(req.body);
    console.log(user);
    // await sendMail(req.body.email);
    const token = await user.generateAuthToken();
    await user.save();
    return res.json(user, {}, {}, token);
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error");
  }
};
const logInPage = async (req, res) => {
  res.render("login");
};
const aboutUs = async (req, res) => {
  res.render("about");
};
const forgot = async (req, res) => {
  res.render("forgot");
};
const signUpPage = async (req, res) => {
  res.render("signUp");
};

module.exports = {
  logInPage,
  signUpPage,
  postUserData,
  getUserData,
  aboutUs,
  forgot,
};
