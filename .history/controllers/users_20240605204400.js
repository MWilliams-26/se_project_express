const User = require('../models/user');

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
   .then((user) => res.send(user))
   .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
  }

module.exports = { getUsers, createUser };