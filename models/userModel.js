const mongoose = require("mongoose");

// schema
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required!"],
    },
    email: {
      type: String,
      required: [true, "email is required!"],
      unique: [true, "You can't use one email for multiple accounts."],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
    },
    usertype: {
      type: String,
      required: [true, "User type is required."],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
  },
  { timestamps: true }
);

// Document middleware
// These are Middlwares that runs before saving the document to the database(pre hook)
// This middleware used to hash the password before saving it to the database.

userSchema.pre("save", async function (next) {});

// create Model
const User = mongoose.model("User", userSchema);

// export
module.exports = User;
