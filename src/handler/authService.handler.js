const services = require('../services/authService.services');

const loginValidator = async (req, res) => {
  const { userName } = req.body;
  const { password } = req.body;
  try {
    const token = await services.loginValidator(userName, password);
    res.header('TOKEN', token);
    res.status(200).json({ token });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { userName } = req.body;
  const { password } = req.body;
  try {
    await services.createUser(userName, password);
    res.status(201).json({ message: 'USER CREATED' });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};

const tokenValidator = async (req, res) => {
  try {
    const userName = await services.tokenValidator(req.headers.token);
    res.status(200).json({ message: userName });
  } catch (err) {
    res.status(err.code).json({ message: err.message });
  }
};
module.exports = {
  loginValidator,
  createUser,
  tokenValidator,
};
