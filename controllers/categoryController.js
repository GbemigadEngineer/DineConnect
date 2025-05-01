"use strict";
const Category = require("../models/categoryModel");
const APIFeatures = require("../utils/apiFeatures");

// CREATE CATEGORY CONTROLLER
const createCategoryController = async (req, res) => {
  try {
    // 1. Extract neccessary data to create a category from the req.body
    const { title, imageUrl } = req.body;
    // 2. Validate the data
    // 2a. Check if all required fields are provided
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Category title is required!",
      });
    }
    // 2b. Check if the data is the currect datatype (string)
    if (typeof title !== "string") {
      return res.status(400).json({
        success: false,
        message: "Category title must be a string!",
      });
    }
    // 3. Create a new category if all validations are passed based on the data
    const newCategory = await Category.create({
      title,
      imageUrl,
    });
    // 4. Send response after creating category
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: {
        newCategory,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Create Category API!",
    });
  }
};

// GET ALL CATEGORIES CONTROLLER
const getAllCategoriesController = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in Get All Categories API!",
    });
  }
};

// EXPORT CONTROLLER
module.exports = {
  createCategoryController,
};
