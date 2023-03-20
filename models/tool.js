// const express = require("Express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },

  rent: {
    type: Number,
    required: true,
    // unique: true,
    trim: true,
  },
  mobile: {
    type: Number,
    required: true,
    // unique: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    name: String,
    data: Buffer,
    contentType: String,
  },
  token: {
    type: String,
    // required: true,
  },
});

userSchema.statics.findByCredentials = async (mobile) => {
  const user = await User.findOne({ mobileNumber: mobile });
  console.log(user);
  if (!user) {
    throw new Error("Unable to login");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
