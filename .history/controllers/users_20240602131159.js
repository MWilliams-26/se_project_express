const User = require("../models/user");

// GET /users

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.send(users)
  })
};

module.exports = { getUsers };