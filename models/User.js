const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pincode is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
