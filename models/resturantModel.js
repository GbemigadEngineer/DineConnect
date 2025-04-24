const mongoose = require("mongoose");

// schema
const resturantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "resturant title is required!"],
    },
    imageUrl: {
      type: String,
    },
    menu: {
      type: Array,
    },
    time: {
      type: String,
    },
    reservations: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    deliveryLocations: {
      type: Array,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: { type: String },
    code: {
      type: String,
    },
    coords: {
      id: { type: string },
      latitude: { type: Number },
      latitudeDelta: { type: Number },
      longitude: { type: Number },
      longitudeDelta: { type: Number },
      address: { type: String },
      title: { type: String },
    },
  },

  { timestamps: true }
);

// create Model
const Resturant = mongoose.model("Resturant", resturantSchema);

// export
module.exports = Resturant;
