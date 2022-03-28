const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const { authRouter } = require('../src/routes/authService.routes');

env.config();

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/authService', authRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
