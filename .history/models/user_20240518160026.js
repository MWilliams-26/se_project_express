const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2, maxlength: 30,
  }, avatar: { type: String },
});

module.exports = ("user", userSchema);