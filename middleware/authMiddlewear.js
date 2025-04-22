const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("error in authMiddlewear", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error or test failure!",
      });
  }
};
