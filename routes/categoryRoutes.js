const express = require("express");

const authMiddleware = require("../middleware/authMiddlewear");
const {
  createCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

// ROUTES
// CREATE CATEGORY
router.route("/create").post(authMiddleware, createCategoryController);

// GET ALL CATEGORIES
router.route("/getAll").get()

// UPDATE CATEGORY
router.route("/")

// EXPORTS
module.exports = router;


