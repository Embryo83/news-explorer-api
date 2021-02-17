require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const { SALT_ROUNDS } = require('../utils/config');
const { NOT_FOUND_USER, NOT_UNIQUE_USER, AUTH_ERROR } = require('../utils/errorMessages');

const { JWT_KEY } = require('../utils/config');

const getUser = (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.user._id);
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
      }
      return res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
  // User.findById(userId)
  //   .orFail(new NotFoundError(NOT_FOUND_USER))
  //   .then((user) => res.send({ user }))
  //   .catch(next);
};

const createUser = (req, res, next) => {
  const {
    password, email, name,
  } = req.body;
  if (!email || !password || !name) {
    throw new UnauthorizedError(AUTH_ERROR);
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(NOT_UNIQUE_USER);
      }
      bcrypt.hash(password, SALT_ROUNDS)
        .then((hash) => User.create({
          name, email, password: hash,
        })
          .then((data) => {
            res.send({
              name: data.name,
              _id: data._id,
              email: data.email,
            });
          })
          .catch(next))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    password, email,
  } = req.body;
  if (!password || !email) {
    throw new UnauthorizedError(AUTH_ERROR);
  }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(AUTH_ERROR);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(AUTH_ERROR);
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_KEY,
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
