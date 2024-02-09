const { User } = require("../db/models");

async function getUser(req, res, next) {
  if (res.locals.user) {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      attributes: ["name", "email", "id"],
    });
    res.locals.user = user;
  }

  next();
}

module.exports = getUser;
