const Resturant = require("../models/resturantModel");

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

// export all controllers
module.exports = {
  createResturantController,
};
