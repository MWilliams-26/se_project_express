const User = require('../models/user');

// GET /users

const getUsers = (req, res) => {
  User.find()
}