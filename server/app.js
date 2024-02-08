const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index.routes');
const { verifyAccessToken } = require('./middleware/verifyJWT');

app.use(cookieParser());
app.use(express.urlencoded({ extended: 'true' }));
app.use(express.json());
app.use(verifyAccessToken);

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Сервер работает на ${PORT} порту!`
  );
});