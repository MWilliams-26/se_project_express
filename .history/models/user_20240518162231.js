const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String },
    required: true,
    validate: {
      validator: validator.isURL,
      message: "Invalid URL",
    }
});

module.exports = ("user", userSchema);