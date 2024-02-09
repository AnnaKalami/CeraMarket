const router = require("express").Router();
const { User } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch ({ message }) {
    res.json({ type: "users router", message });
  }
});

module.exports = router;
