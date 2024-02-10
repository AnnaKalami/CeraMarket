const router = require("express").Router();
const { User,Like } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({include:Like});
    res.json({ users });
  } catch ({ message }) {
    res.json({ type: "users router", message });
  }
});

module.exports = router;
