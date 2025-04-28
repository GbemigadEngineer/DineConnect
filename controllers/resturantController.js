const Resturant = require("../models/resturantModel");
const APIFeatures = require("../utils/apiFeatures");

// CREATE RESTURANT CONTROLLER
const createResturantController = async (req, res) => {
  try {
    // 1. Extract the neccessary date to create a resturant from the req.body
    const {
      title,
      imageUrl,
      menu,
      time,
      reservations,
      delivery,
      deliveryLocations,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // 2. Validate the data
    // 2a. Check if all required fields are provided
    if (!title || !coords) {
      return res.status(400).json({
        success: false,
        message: "Resturant title and address is required!",
      });
    }
    //3. Create new resturant if all validations are passed
    const newResturant = await Resturant.create({
      title,
      imageUrl,
      menu,
      time,
      reservations,
      delivery,
      deliveryLocations,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    // 4. Send response after creating resturant
    res.status(201).json({
      success: true,
      message: "Resturant created successfully!",
      data: {
        newResturant,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating resturant!",
    });
  }
};

// GET ALL RESTURANTS CONTROLLER
const getAllResturantsController = async (req, res) => {
  try {
    // 1. Create a new APIFeatures object and pass the query and queryString to it
    const features = new APIFeatures(Resturant.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // 2. Get all resutant data from databse based on the features object
    const resturants = await features.query;
    // 3. Send response with the data
    res.status(200).json({
      success: true,
      message: "All resturants fetched successfully!",
      results: resturants.length,
      data: {
        resturants,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all resturants!",
    });
  }
};

// export all controllers
module.exports = {
  createResturantController,
  getAllResturantsController,
};
