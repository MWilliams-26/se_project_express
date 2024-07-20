const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, avatar: { type: String },
});

module.exports = ("user", userSchema);