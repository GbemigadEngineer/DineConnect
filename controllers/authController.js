"use strict";
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

//  register Controller
const registerController = async (req, res) => {
  try {
    // extract data necessary to create new user from the request body.
    const { userName, email, password, phone, address } = req.body;
    // validate the data to make sure user inputed all the necessary data.
    if (!userName || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields!",
      });
    }
    // validate to check that the user doesnt exist.
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message:
          "This Email is registered, please login or use different email to register!",
      });
    }
    // hashing password before saving it to the database.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create new user, if all validations are passed
    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "User successfully registered.",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In registering User with API",
    });
  }
};

// Login Controller
const loginController = async (req, res) => {
  try {
    // extract login data from the req.body
    const { email, password, phone } = req.body;

    // validate the data to make sure user inputed all the necessary data.
    if (!email && !phone) {
      return res.status(500).send({
        success: false,
        message:
          "Please provide either the email or phone number used to register.",
      });
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Please provide your password.",
      });
    }
    // check if the user exists in the database.
    const user = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found in database!",
      });
    }
    // check if the hashed password is correct.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Incorrect password.",
      });
    }
    // create a token for the user.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password;
    // send success response to the client.
    res.status(200).send({
      success: true,
      message: "User successfully logged in.",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In logging in User with API",
    });
  }
};

module.exports = { registerController, loginController };
