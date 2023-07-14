const router = require('express').Router();
const mongoose = require('mongoose');
const { Joi, celebrate } = require('celebrate');

const JoiObjectId = Joi.string().custom(
  (value, helpers) => {
    const filtered = mongoose.Types.ObjectId.isValid(value);
    return !filtered ? helpers.error('any.invalid') : value;
  },
  'invalid objectId',
).required();

const {
  getAllUsers,
  getUserById,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers);
router.get('/users/me', getMe);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: JoiObjectId,
  }),
}), getUserById);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), updateAvatar);

module.exports = router;
