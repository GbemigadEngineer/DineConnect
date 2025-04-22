"use strict";
const User = require("../models/userModel");
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
    // create new user, if all validations are passed
    const user = await User.create({
      userName,
      email,
      password,
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

module.exports = { registerController };
