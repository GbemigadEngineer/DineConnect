const express = require("express");
const { registerController } = require("../controllers/authController");

const router = express.Router();

// routes
// REGISTER ROUTE
router.route("/register").post(registerController);

// export
module.exports = router;
