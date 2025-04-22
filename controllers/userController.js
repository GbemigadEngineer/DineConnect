"use strict";

// Get User info
const getUserController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Test Successfull!",
      data: {
      },
    });
  } catch (error) {
    console.log("error in getUserController", error);
    res.status(500).json({ message: "Internal Server Error or test failure!" });
  }
};

module.exports = {
  getUserController,
};
