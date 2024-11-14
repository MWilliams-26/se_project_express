const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const ConflictError = require('../utils/errors/ConflictError');

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then(() => res.status(201).send({ name, avatar, email }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      }
      else {
        next(err);
      }
    })
}

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      }
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Invalid data");
  }

  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then(() => {
      if (!updateUser) {
        throw new NotFoundError("User not found");
      }
      res.send(updateUser);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
}

module.exports = { getCurrentUser, createUser, login, updateUser };