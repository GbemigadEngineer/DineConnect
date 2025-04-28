const express = require("express");

const authMiddleware = require("../middleware/authMiddlewear");
const {
  createResturantController,
  getAllResturantsController,
} = require("../controllers/resturantController");
const { get } = require("mongoose");

const router = express.Router();

// ROUTES
// CREATE RESTURANT
router.route("/create").post(authMiddleware, createResturantController);

// GET ALL RESTURANTS
router.route("/").get(authMiddleware, getAllResturantsController);
// Exports
module.exports = router;
