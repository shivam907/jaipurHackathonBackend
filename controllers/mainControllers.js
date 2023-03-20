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

    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error");
  }
};
const login = async (req, res, next) => {
  console.log("Loginp : \n", req.session.currentUser);
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.mobile,
      req.body.password
    );
    console.log("hlo hlo");
    console.log("user: ", user);
    const token = await user.generateAuthToken();
    req.session.token = token;

    req.session.user = await user;
    // res.redirect("/profile");
    req.session.login = true;
    console.log("hnji");
    return res.redirect("/dashboard");
  } catch (err) {
    // console.log(e);
    res.status(400).send({ error: err.message });
  }
};
const logout = async (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
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
const dashboard = async (req, res) => {
  if (req.session.user) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
};

module.exports = {
  logInPage,
  signUpPage,
  postUserData,
  getUserData,
  aboutUs,
  forgot,
  login,
  dashboard,
};
