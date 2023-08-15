const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// В файле controllers/users.js создайте контроллер login,
// который получает из запроса почту и пароль и проверяет их.
// Если почта и пароль правильные, контроллер должен создавать JWT сроком на неделю.
// eslint-disable-next-line max-len
// В пейлоуд токена следует записывать только свойство _id, которое содержит идентификатор пользователя:

// controllers/users.js

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неверный логин или пароль' });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NoValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NoValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: ' Переданы некорректные данные пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: ' Переданы некорректные данные пользователя' });
      } else {
        res
          .status(500)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
      } else if (err.kind === 'ObjectId') {
        res.status(404).send({ message: ' Пользователя нет в базе' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NoValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: ' Переданы некорректные данные пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
