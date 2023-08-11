const express = require('express');

const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;

// eslint-disable-next-line import/no-unresolved, import/extensions
const router = require('./routes/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(router);

app.use((req, res, next) => {
  req.user = {
    _id: '64d5695e2b3fad782ca99901',
  };

  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
