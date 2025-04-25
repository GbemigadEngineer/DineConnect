const express = require("express");

const authMiddleware = require("../middleware/authMiddlewear");
const {
  createResturantController,
} = require("../controllers/resturantController");

const router = express.Router();

// ROUTES
// CREATE RESTURANT
router.post("/create", authMiddleware, createResturantController);

// Exports
module.exports = router;
