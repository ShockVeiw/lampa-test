const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
};
