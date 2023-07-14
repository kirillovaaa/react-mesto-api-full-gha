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
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getAllCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: JoiObjectId,
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: JoiObjectId,
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: JoiObjectId,
  }),
}), dislikeCard);

module.exports = router;
