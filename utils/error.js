const errorHandler = (err, next, message) => {
  const error = new Error(err);
  if (!err.statusCode) {
    error.statusCode = 500;
  }
  error.message = message;
  next(error);
};

module.exports = errorHandler;
