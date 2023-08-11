const express = require('express');

const mongoose = require('mongoose');

const helmet = require('helmet');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// eslint-disable-next-line import/no-unresolved, import/extensions
const router = require('./routes/users');

mongoose.connect(DB_URL);

app.use(express.json());

app.use(router);

app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
