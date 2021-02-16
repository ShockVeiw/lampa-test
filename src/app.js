const express = require('express');
const cors = require('cors');
const adRouter = require('./routers/ad.router');

const app = express();

app.use(cors()); // enable All CORS Requests
app.use(express.json());

app.use('/ads', adRouter);

// error handling
app.use((err, req, res, next) => {
  let statusCode, message;
  
  if (err.name === 'ResponseError') {
    statusCode = err.statusCode;
    message = err. message;
  }

  res
    .status(statusCode || 500)
    .json({ errorMessage: message || 'Internal Server Error' });
});

module.exports = app;