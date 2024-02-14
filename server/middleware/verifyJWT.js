const jwt = require('jsonwebtoken');
const generateTokens = require('../utils/authUtils');
const configJWT = require('./configJWT');
require('dotenv').config()

function verifyRefreshToken(req, res, next) {
  try {
    const { refresh } = req.cookies;
    const { user } = jwt.verify(refresh, process.env.TOKEN_R);
    const { accessToken, refreshToken } = generateTokens({
      user: { id: user.id, img: user.img, name: user.name , isAdmin:user.isAdmin, isMaster:user.isMaster},
    });
    res.locals.user = user;
    res.cookie(configJWT.refresh.type, refreshToken, {
      maxAge: configJWT.refresh.expiresIn,
      httpOnly: true,
    });
    res.cookie(configJWT.access.type, accessToken, {
      maxAge: configJWT.access.expiresIn,
      httpOnly: true,
    });
    next();
  } catch (error) {
    res.clearCookie(configJWT.access).clearCookie(configJWT.refresh);
    next();
  }
}

function verifyAccessToken(req, res, next) {
  try {
    const { access } = req.cookies;
    const { user } = jwt.verify(access, process.env.TOKEN_A);
    res.locals.user = user;
    next();
  } catch (error) {
    verifyRefreshToken(req, res, next);
  }
}

module.exports = { verifyAccessToken };