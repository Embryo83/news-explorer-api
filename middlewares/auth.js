require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED } = require('../utils/errorMessages');

// const { JWT_KEY } = process.env;
const { JWT_KEY } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
  // if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new UnauthorizedError(UNAUTHORIZED));
  }
  req.user = payload;
  next();
};

module.exports = auth;
