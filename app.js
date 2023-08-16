const express = require('express');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
// eslint-disable-next-line import/no-unresolved
// const helmet = require('helmet');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));
// eslint-disable-next-line import/no-unresolved, import/extensions
const router = require('./routes/users');
const { login, createUser } = require('./controllers/users');

app.post('/signin', login);
app.post('/signup', createUser);

mongoose.connect(DB_URL);

app.use(router);

app.use(errors());
app.use((err, req, res, next) => {
  const { message, statusCode = 500 } = err;
  console.log(message);
  res.status(err).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});
// app.use(helmet());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
