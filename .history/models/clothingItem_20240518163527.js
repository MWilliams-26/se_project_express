const mongoose = require("mongoose");


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
    minLength: 2,
    maxlength: 30,
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
  }
});

module.exports = ("item", clothingItemSchema);