const User = require("../models/user");

// GET /users

const getUsers = (req, res) => {
  console.log("")
  // User.find()
  // .then((users) => res.send(users))
  // .catch((err) => {
  //   console.error(err);
  // });
};

module.exports = { getUsers };
