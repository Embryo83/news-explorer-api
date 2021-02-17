require('dotenv').config();

const {
  PORT, JWT_SECRET, MONGO_URL, NODE_ENV,
} = process.env;

const SALT_ROUNDS = 10;

const ENV_PORT = PORT || 3000;
const JWT_KEY = (NODE_ENV === 'production') ? JWT_SECRET : 'dev-secret';
const DB_URL = MONGO_URL || 'mongodb://localhost:27017/newsdb';

const MONGO_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  ENV_PORT, JWT_KEY, DB_URL, MONGO_CONFIG, SALT_ROUNDS,
};
