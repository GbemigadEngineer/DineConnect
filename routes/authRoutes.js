const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

// routes
// REGISTER ROUTE
router.route("/register").post(registerController);

// LOGIN ROUTE
router.route("/login").post(loginController);

// export
module.exports = router;
