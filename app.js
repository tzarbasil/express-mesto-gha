const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
// const helmet = require('helmet');

const app = express();
app.use(express.json());

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// eslint-disable-next-line import/no-unresolved, import/extensions
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

app.use(usersRouter);
app.use(cardsRouter);

const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect(DB_URL);

app.use(errors());
app.use((err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  console.log(message);
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

// app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
