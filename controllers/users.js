require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send({ user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    password, email, name,
  } = req.body;
  return bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      password: hash, email, name,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      next(err);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const {
    password, email,
  } = req.body;
  if (!password || !email) {
    throw new UnauthorizedError('Некорректно введён email или пароль');
  }
  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные email или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Некорректно введён email или пароль');
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.status(200).send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login,
};
