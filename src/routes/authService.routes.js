const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const router = express.Router();
const handler = require('../handler/authService.handler');

const schema = Joi.object({
  userName: Joi.string().regex(/^[A-Z,a-z,0-9]+$/).required(),
  password: Joi.string().regex(/^[A-Z,a-z,]+$/).required(),
});

router.post('/login-details',validator.body(schema), handler.loginValidator);

module.exports = {
  authRouter: router,
};
