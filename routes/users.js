const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const celebrate = require('../middlewares/celebrate');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/users', getUsers);
router.get('/users/:id', celebrate.validateUserId, getUser);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate.validateUpdateUser, updateUser);
router.patch('/users/me/avatar', celebrate.validateUserAvatar, updateAvatar);

module.exports = router;
