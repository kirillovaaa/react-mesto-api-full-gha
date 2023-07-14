const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const { ConflictError } = require('../errors/ConflictError');
const { ServerError } = require('../errors/ServerError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const validateCredentials = (email, password) => {
  let userData;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Пользователь с данным email не найден'));
      }
      userData = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
      // хеши не совпали — отклоняем промис
        return Promise.reject(new UnauthorizedError('Неправильный пароль'));
      }
      // если ошибки не вызвались, то все верно!
      return Promise.resolve(userData);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  validateCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secretkey111',
        { expiresIn: '7d' },
      );
      res.send({ token }); // ответ клиенту
    })
    .catch((err) => {
      if (err instanceof UnauthorizedError) {
        next(err);
      } else {
        next(new ServerError());
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const dbUser = user.toObject();
      delete dbUser.password;
      res.status(201).send(dbUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else {
        next(new ServerError());
      }
    });
};
