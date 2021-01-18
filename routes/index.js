const router = require('express').Router();
const articlesRouter = require('./articles.js');
const usersRouter = require('./users.js');
const { login, createUser } = require('../controllers/users.js');
const { validateLogin, validateRegister } = require('../middlewares/validate');
const auth = require('../middlewares/auth.js');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERR } = require('../utils/errorMessages');

router.post('/signin', validateLogin, login);

router.post('/signup', validateRegister, createUser);

router.use(auth);
router.use('/', articlesRouter, usersRouter);
router.use('*', () => {
  throw new NotFoundError(NOT_FOUND_ERR);
});

module.exports = router;
