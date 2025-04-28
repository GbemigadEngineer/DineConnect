"use strict";
const mongoose = require("mongoose");
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
    // 3. Validate the data
    // 3a. Check if there are any resturant in the database matching the query
    if (!resturants || resturants.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resturants found!",
      });
    }
    // 3b. Check if the user is authenticated and has access to the data

    // 4. Send response with the data
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

// GET A RESTURANT OR GET RESTURANT BY ID CONTROLLER
const getResturantByIdController = async (req, res) => {
  try {
    // 1. Get the id from the request parameters i.e req.params
    const { id } = req.params;
    // 2. Validate the id
    // 2a. Check if the there is an id provided in the request parameters
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Resturant ID is required!",
      });
    }
    // 2b. Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Resturant ID!",
      });
    }
    // 3. Create a new APIFeatures object and pass the query and queryString to it
    const features = new APIFeatures(Resturant.findById(id), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();

    // 4. Get the resturant data from the database based on the id and features object
    const resturant = await features.query;
    // 5. Validate the data
    // 5a. Check if the resturant exists in the database
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not found!",
      });
    }
    // 6. Send response with the data
    res.status(200).json({
      success: true,
      message: "Resturant fetched successfully!",
      data: {
        resturant,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting resturant!",
    });
  }
};

// DELETE RESTURANT CONTROLLER

const deleteResturantController = async (req, res) => {
  try {
    // 1. Get the id from the request parameters i.e req.params
    const { id } = req.params;
    // 2. Validate the id
    // 2a. Check if the there is an id provided in the request parameters
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Resturant ID is required!",
      });
    }
    // 2b. Check if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Resturant ID!",
      });
    }
    // 2c. Check if  the resturant with that id exists in the database
    const resturant = await Resturant.findById(id);
    if (!resturant) {
      return res.status(404).json({
        success: false,
        message: "Resturant not found!",
      });
    }
    // 3. Delete the resturant from the database based on the id
    await Resturant.findByIdAndDelete(id);
    // 4. Send response with the data
    res.status(200).json({
      success: true,
      message: "Resturant deleted successfully!",
    });
  } catch {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting resturant!",
    });
  }
};

// export all controllers
module.exports = {
  createResturantController,
  getAllResturantsController,
  getResturantByIdController,
  deleteResturantController,
};
