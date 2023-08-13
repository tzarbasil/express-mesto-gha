const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res
      .status(500)
      .send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('notValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Карточки нет в базе' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: ' Переданы некорректные данные карточки ' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: ' Переданы некорректные данные карточки' });
      } else {
        res
          .status(500)
          .send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Карточки нет в базе' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: ' Переданы некорректные данные ' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('notValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'notValidId') {
        res.status(404).send({ message: 'Карточки нет в базе' });
      } else if (err.kind === 'ObjectId') {
        res.status(400).send({ message: ' Переданы некорректные данные ' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
