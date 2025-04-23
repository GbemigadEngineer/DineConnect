"use strict";
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
// Get User info
const getUserController = async (req, res) => {
  try {
    //1.  Find user by id
    const user = await User.findById({ _id: req.body.id });

    //2. Validate
    // 2a. Validate user existence
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    //3. remove password from user object before sending response
    user.password = undefined;

    // 4. Send response after validation
    res.status(200).json({
      success: true,
      message: "Test Successfull!",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Error in Get User API!" });
  }
};

// UPDATE USER CONTROLLER

const updateUserController = async (req, res) => {
  try {
    // 1. Get user id from request body
    const userId = req.body.id;
    // 2. Validate
    // 2a. Validate to make sure user ID is provided and exists in our database
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required!",
      });
    }
    // 2b. Check if user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    // 3. Update user data based on the request body
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        userName: req.body.userName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        profile: req.body.profile,
        address: req.body.address,
      },
      { new: true, runValidators: true }
    );
    // 4. Remove password from the updated user object before sending response
    updatedUser.password = undefined;
    // 5. Send response after validation
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "fail", message: "Error in Update User API!" });
  }
};

// UPDATE USER PASSWORD CONTROLLER

const updateUserPasswordController = async (req, res) => {
  try {
    // 1. Find user by ID
    const user = await User.findById({ _id: req.body.id });
    // 2. Validation
    // 2a. Validate user existence
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    // 3. get the old and new password from the request body
    const { oldPassword, newPassword } = req.body;
    // 4.Validate Old Password
    // 4a. Check if the old password and new password are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide both old and new passwords!",
      });
    }
    // 4b. Check if the old password is correct i.e matches the hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect!",
      });
    }
    // 5. set new password
    
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "fail", message: "Error in Update User Password API!" });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updateUserPasswordController,
};
