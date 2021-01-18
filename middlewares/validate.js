const { celebrate, Joi } = require('celebrate');
const isURL = require('validator/lib/isURL');
const { NOT_VALID_URL } = require('../utils/errorMessages');

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(NOT_VALID_URL);
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.message(NOT_VALID_URL);
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(6),
    password: Joi.string().required().min(2),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().min(6),
    password: Joi.string().required().min(2),
    name: Joi.string().required().min(2),
  }),
});

module.exports = {
  validateArticle,
  validateId,
  validateLogin,
  validateRegister,
};
