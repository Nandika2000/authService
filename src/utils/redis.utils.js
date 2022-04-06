const Redis = require('ioredis');

const redis = new Redis(6379, 'redis');

redis.set('mykey', 'value');

const setKey = (key, value) => {
  redis.set(key, value, 'EX', process.env.TOKEN_EXPIRY);
};
const getValue = (key) => redis.get(key);
module.exports = {
  setKey,
  getValue,
};
