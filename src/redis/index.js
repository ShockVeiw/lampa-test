const Redis = require('ioredis');
const { REDIS_PORT, REDIS_HOST } = require('../common/config');

const redis = new Redis.createClient(
  {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
);

module.exports = redis;
