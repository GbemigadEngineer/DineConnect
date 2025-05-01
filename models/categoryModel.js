const mongoose = require("mongoose");

// schema
const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required!"],
    },
    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dqj0xv4gk/image/upload/v1698231232/food-app/food-category.png",
      required: [true, "Category image is required!"],
    },
  },
  { timestamps: true }
);
// create Model
const Category = mongoose.model("Category", categorySchema);

// export
module.exports = Category; 
