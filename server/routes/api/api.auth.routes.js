const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Like } = require("../../db/models");
const generateTokens = require("../../utils/authUtils");
const configJWT = require("../../middleware/configJWT");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    const millDate = new Date().getMilliseconds();
    const uniqueFilename = `${millDate}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage });

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

router.post("/sign-in", async (req, res) => {
  let user;
  try {
    const { email, password } = req.body;
    user = await User.findOne({ where: { email }, include: Like });
    if (!user) {
      res.json({ message: "Такого пользователя нет или пароль неверный" });
      return;
    }
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame) {
      res.json({ message: "Такого пользователя нет или пароль неверный" });
      return;
    }
    const { accessToken, refreshToken } = generateTokens({
      user: {
        id: user.id,
        name: user.name,
        img: user.img,
        isAdmin: user.isAdmin,
        isMaster: user.isMaster,
      },
    });

    // устанавливаем куки
    res.cookie("access", accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie("refresh", refreshToken, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    });
    res.json({ message: "success", user });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post("/sign-up", upload.any("img"), async (req, res) => {
  let user;
  try {
    const { name, email, password, rpassword, isMaster } = req.body;
    // const newFileUrl = `/img/${req.file.originalname}`;
    let pathImg
    await Promise.all(req.files.map(async (i) => {
      pathImg=  `/img/${i.filename}`
    }));
    if (!isValidEmail(email)) {
      res.status(400).json({
        type: "validEmail",
        message: "Некорректный формат электроный почты!",
      });
      return;
    }
    if (password !== rpassword) {
      res.status(400).json({ message: "Пароли не совпадают!" });
      return;
    }
    user = await User.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ message: "Такой пользователь уже есть!" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hash,
      img: pathImg,
      isMaster,
      isAdmin: false,
    });

    const { accessToken, refreshToken } = generateTokens({
      user: {
        id: user.id,
        name: user.name,
        img: user.img,
        isAdmin: user.isAdmin,
        isMaster: user.isMaster,
      },
    });

    // устанавливаем куки
    res.cookie("access", accessToken, {
      maxAge: 1000 * 60 * 5,
      httpOnly: true,
    });
    res.cookie("refresh", refreshToken, {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    });
    user = await User.findOne({ where: { email }, include: Like });
    res.status(200).json({ message: "success", user });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get("/check", async (req, res) => {
  if (res.locals.user) {
    const user = await User.findOne({
      where: { id: res.locals.user.id },
      include: Like,
    });
    res.json({ user });
    return;
  }
  res.json({});
});

router.get("/logout", (req, res) => {
  res.clearCookie(configJWT.access.type).clearCookie(configJWT.refresh.type);
  res.json({ message: "success" });
});

module.exports = router;
