const utils = require('../utils/token.utils');
const models = require('../../models');
const { CustomException } = require('../constants/customError');
const redis = require('../utils/redis.utils');

const loginValidator = async (userName, password) => {
  const fetchedPassword = await models.loginDetails.findAll({ attributes: ['password'], where: { userName: `${userName}` } });
  if (fetchedPassword.length === 0) {
    throw CustomException('USER NOT FOUND', 404);
  }
  if (fetchedPassword[0].dataValues.password !== password) {
    throw CustomException('WRONG PASSWORD', 401);
  } else {
    const token = await utils.createToken(userName);
    redis.setKey(token, userName);
    return token;
  }
};

const createUser = async (userName, password) => {
  const data = await models.loginDetails.findAll({ where: { userName: `${userName}` } });
  if (data.length !== 0) {
    throw CustomException('UserName already exists', 400);
  } else {
    await models.loginDetails.create({
      userName: `${userName}`,
      password: `${password}`,
    });
  }
};

const tokenValidator = (token) => {
  const userName = redis.getValue(token);
  return userName;
};
module.exports = {
  loginValidator,
  createUser,
  tokenValidator,
};
