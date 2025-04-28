const express = require("express");

const authMiddleware = require("../middleware/authMiddlewear");
const {
  createResturantController,
  getAllResturantsController,
  getResturantByIdController,
  deleteResturantController,
} = require("../controllers/resturantController");
const { get } = require("mongoose");

const router = express.Router();

// ROUTES
// CREATE RESTURANT
router.route("/create").post(authMiddleware, createResturantController);

// GET ALL RESTURANTS
router.route("/").get(getAllResturantsController);

// GET DELETE AND UPDATE A RESTURANT OR GET DELETE AND UPDATE RESTURANT BY ID
router
  .route("/:id")
  // GET A RESTURANT OR GET RESTURANT BY ID
  .get(getResturantByIdController)
  // DELETE RESTURANT BY ID
  .delete(authMiddleware, deleteResturantController);

// Exports
module.exports = router;
