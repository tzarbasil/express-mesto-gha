const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.use(auth);

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
