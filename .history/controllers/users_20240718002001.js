const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  REQUEST_SUCCESS,
  UNAUTHORIZED_ERROR
} = require('../utils/errors');

// GET /users

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       console.error(err);
//       return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
//     });
// };

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         throw new Error('User already exists');
//       }
//       return res.status(BAD_REQUEST_ERROR).send({ message: "User already exists" });
//     })

//   User.create({ name, avatar, email, password })
//     .then((user) => res.status(201).send(user))
//     .catch((err) => {
//       console.error(err);
//       if (err.name === 'ValidationError') {
//         return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
//       }
//       return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
//     });
// };

// const getUser = (req, res) => {
//   const { userId } = req.params;
//   User.findById(userId)
//     .orFail()
//     .then((user) => res.send(user))
//     .catch((err) => {
//       console.error(err);
//       if (err.name === 'CastError') {
//         return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
//       }
//       if (err.name === 'DocumentNotFoundError') {
//         return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
//       }
//       return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
//     });
// };

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
      .then((user) => 
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
        }
        if (err.code === 11000) {
          return res.status(BAD_REQUEST_ERROR).send({ message: "User already exists" });
        }
        return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
      });
  });
}
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED_ERROR).send({ message: "Incorrect email or password" });
      }
      return res.status(err.status).send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser, login };