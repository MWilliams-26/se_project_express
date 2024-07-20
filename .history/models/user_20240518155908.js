const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {}
});

module.exports = ("user", userSchema);