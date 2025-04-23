const express = require("express");
const {
  getUserController,
  updateUserController,
  updateUserPasswordController,
} = require("../controllers/userController");
const authMiddlewear = require("../middleware/authMiddlewear");

const router = express.Router();

// ROUTES

// GET USER
router.route("/getUser").get(authMiddlewear, getUserController);

// UPDATE USER PROFILE
router.route("/updateUser").patch(authMiddlewear, updateUserController);

// UPDATE USER PASSWORD
router
  .route("/updatePassword")
  .post(authMiddlewear, updateUserPasswordController);

module.exports = router;
