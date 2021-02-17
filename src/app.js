const express = require('express');
const cors = require('cors');
const adRouter = require('./routers/ad.router');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors()); // enable All CORS Requests
app.use(express.json());

app.use('/ads', adRouter);

app.use(errorHandler);

module.exports = app;