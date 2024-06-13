const User = require("../models/user");

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { getUsers };
