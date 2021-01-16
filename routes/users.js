const router = require('express').Router();
// const { Joi, celebrate } = require('celebrate');
const { getUser } = require('../controllers/users');

router.get('/users/me', getUser);

module.exports = router;
