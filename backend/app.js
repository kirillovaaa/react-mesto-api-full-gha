const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { errorMiddleware } = require('./middlewares/error');
const { authMiddleware } = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { NotFoundError } = require('./errors/NotFoundError');

const app = express();
const port = 3000;

// подключаемся к БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// подключаем json парсер
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// обработчик логгера
app.use(requestLogger);

// незащищенные роуты
app.use(authRouter);

// защита авторизацией
app.use(authMiddleware);

// защищенные роуты
app.use(usersRouter);
app.use(cardsRouter);

// обработка роута "*" - ошибка 404
app.use((req, res, next) => {
  next(new NotFoundError());
});

// обработчик логгера - ошибки
app.use(errorLogger);

// отлов ошибки
app.use(errors({ statusCode: 400 }));
app.use(errorMiddleware);

app.listen(port, () => {
  /* eslint no-console: "off" */
  console.log(`Example app listening on port ${port}`);
});
