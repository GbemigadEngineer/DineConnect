const express = require("express");
const { getUserController } = require("../controllers/userController");
const authMiddlewear = require("../middleware/authMiddlewear");

const router = express.Router();

// ROUTES

// GET USER
router.route("/getUser").get(authMiddlewear, getUserController);

module.exports = router;
