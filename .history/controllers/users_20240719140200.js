const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../utils/config');
const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  REQUEST_SUCCESS,
  UNAUTHORIZED_ERROR,
  CONFLICT_ERROR
} = require('../utils/errors');

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  console.log(req.body);

  if (!email) {
    return res.status(BAD_REQUEST_ERROR).send({ message: "Email is required" });
  }

  return User.findOne({ email }).then((existingUser) => {
    if (existingUser) 
  })


  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({ name, avatar, email, password: hash, }))
    .then((user) => {
      const userInfo = user.toObject();
      delete userInfo.password;
      res.status(REQUEST_SUCCESS).send(userInfo);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.code === "") {
        return res.status(CONFLICT_ERROR).send({ message: "Email already exists" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
    });
};


const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(REQUEST_SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "An error has occurred on the server." });
    });
};
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

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(REQUEST_SUCCESS).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError" || err.name === "ValidationError") {
        return res.status(BAD_REQUEST_ERROR).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR).send({ message: "That does not live here!" });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: "An error has occurred on the server"
      });
    });
};

module.exports = { getCurrentUser, createUser, login, updateUser };