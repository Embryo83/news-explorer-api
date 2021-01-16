const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter.js');
const finalErrorHandler = require('./middlewares/finalErrorHandler.js');
const router = require('./routes/index.js');
const { ENV_PORT, DB_URL, MONGO_CONFIG } = require('./utils/config');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
mongoose.connect(DB_URL, MONGO_CONFIG);

app.use(cors({ origin: true }));

app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use(router);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());

app.use(finalErrorHandler);

app.listen(ENV_PORT);
