const finalErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

module.exports = finalErrorHandler;
