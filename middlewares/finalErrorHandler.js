const { SERVER_ERR } = require('../utils/errorMessages');

const finalErrorHandler = (err, req, res, next) => {
  // if (err.status) {
  //   res.status(err.status).send(err.message);
  //   return;
  // }
  // res.status(500).send({ message: err.message });
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? SERVER_ERR
        : message,
    });
  next();
};

module.exports = finalErrorHandler;
