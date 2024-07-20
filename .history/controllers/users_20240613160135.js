const User = require('../models/user');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR
} = require('../utils/errors');

// GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({ message:  "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Wrong ID Fool!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
  .orFail()
  .then((user) => res.status(200).send(user))
  .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.name === 'DocumentNotFound') {
        return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
      }
      return res.status(NOT_FOUND_ERROR).send({ message: "err.message" });
    });
};

module.exports = { getUsers, createUser, getUser };