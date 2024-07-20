const mongoose = require("mongoose");
const validator

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
});

module.exports = ("user", userSchema);