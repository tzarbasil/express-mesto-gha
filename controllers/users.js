const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about })
    .then((user) => res.send(user))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch(() => res
      .status(500)
      .send({ message: 'На сервере произошла ошибка' }));
};
