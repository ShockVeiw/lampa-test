module.exports = (err, req, res, next) => {
  let statusCode, message;
  
  if (err.name === 'ResponseError') {
    statusCode = err.statusCode;
    message = err. message;
  }

  res
    .status(statusCode || 500)
    .json({ errorMessage: message || 'Internal Server Error' });
};