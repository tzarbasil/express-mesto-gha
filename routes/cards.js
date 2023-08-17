const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const celebrate = require('../middlewares/celebrate');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.use(auth);

router.get('/cards', getCards);
router.delete('/cards/:cardId', celebrate.validateCardId, deleteCard);
router.post('/cards', celebrate.validateCreateCard, createCard);
router.put('/cards/:cardId/likes', celebrate.validateCardId, likeCard);
router.delete('/cards/:cardId/likes', celebrate.validateCardId, dislikeCard);

module.exports = router;
