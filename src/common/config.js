const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST ||  'redis',
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
};
