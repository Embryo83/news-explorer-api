const router = require('express').Router();
const articlesRouter = require('./articles.js');
const usersRouter = require('./users.js');
const { login, createUser } = require('../controllers/users.js');
const { validateLogin, validateRegister } = require('../middlewares/validate');
const auth = require('../middlewares/auth.js');

router.post('/signin', validateLogin, login);

router.post('/signup', validateRegister, createUser);

router.use(auth);
router.use('/', articlesRouter, usersRouter);

module.exports = router;
