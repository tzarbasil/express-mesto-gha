const Card = require('../models/card');

const ForbiddenError = require('../errors/forbiddenError');

const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res
      .status(500)
      .send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        return Promise.reject(
          new ForbiddenError('Вы не можете удалить эту карточку'),
        );
      }
      return Card.deleteOne(card)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
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
