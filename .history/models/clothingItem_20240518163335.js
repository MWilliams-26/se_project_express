const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxlength: 30,
  },
  
});

module.exports = ("item", clothingItemSchema);