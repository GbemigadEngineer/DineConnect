const express = require("express");
const { getUserController } = require("../controllers/userController");

const router = express.Router();

// ROUTES

// GET USER
router.route("/getUser").get(getUserController);


module.exports = router;
