const router = require('express').Router();
const { Item, ItemGallery, ItemImage } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
      const items = await Item.findAll({
        include: {
          model: ItemGallery,
          include: ItemImage
        }
      });
      res.json({ items });
    } catch ({ message }) {
      res.json({ type: 'item router', message });
    }
  });
module.exports = router;
