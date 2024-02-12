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

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (res.locals.user.isAdmin){
      const result = await User.destroy({ where: { id: userId, isAdmin:false} });
      if (result > 0) {
        res.json({ message: 'success', userId });
        return;
      }
    }
    res.json({ message: 'Не твоя, вот ты и бесишься' });
  } catch ({ message }) {
    res.json({ message });
  }
});


module.exports = router;
