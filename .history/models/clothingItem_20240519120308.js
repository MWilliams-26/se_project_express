const mongoose = require("mongoose");
const validator = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ['hot', 'Rainy', 'Snowy', 'Cloudy'],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {

  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = ("item", clothingItemSchema);