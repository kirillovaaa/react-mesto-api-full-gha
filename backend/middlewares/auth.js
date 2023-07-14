const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

// eslint-disable-next-line consistent-return
module.exports.authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, 'secretkey111');
    } catch (err) {
      next(new UnauthorizedError('Формат токена неверный'));
    }

    req.user = payload; // записываем пейлоуд в объект запроса

    next(); // пропускаем запрос дальше
  }
};
