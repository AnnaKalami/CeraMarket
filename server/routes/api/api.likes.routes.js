const router = require('express').Router();
const { Like, User } = require('../../db/models');
router.post('/', async (req, res) => {
    try {
      const {userId, itemId} = req.body;
      const like = await Like.create({user_id:userId, item_id:itemId});
      res.json({like});
    } catch ({ message }) {
      res.json({ type: 'items router', message });
    }
  });

  
  router.delete('/:likeId', async (req, res) => {
    try {
      const { likeId } = req.params;
      const result = await Like.destroy({ where: { id: likeId, user_id: res.locals.user.id } });
      if (result > 0) {
        res.json({ message: 'success', likeId });
        return;
      }
      res.json({ message: 'Не твоя, вот ты и бесишься' });
    } catch ({ message }) {
      res.json({ message });
    }
  });
  
module.exports = router;
