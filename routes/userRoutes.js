const express = require("express");
const {
  getUserController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
  deleteUserController,
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

router.route("/resetPassword").patch(authMiddlewear, resetPasswordController);

// DELETE USER
router.route("/deleteUser/:id").delete(authMiddlewear, deleteUserController);

module.exports = router;
