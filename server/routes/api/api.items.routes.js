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

  router.post('/', async (req, res) => {
    try {
      const {description, price } = req.body;
      //тут создание галлереии и картинки
      const item = await Item.create({description,price,user_id:res.locals.user.id,});
      const createGallery = await ItemGallery.create({item_id:item.id})
      const newItem = await Item.findOne({where: { user_id:res.locals.user.id,id:item.id }, include: {
        model: ItemGallery,
        include: ItemImage
      }});
      res.json({item:newItem});
    } catch ({ message }) {
      res.json({ type: 'items router', message });
    }
  });


  router.delete('/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      const result = await Item.destroy({ where: { id: itemId, user_id:res.locals.user.id } });
      if (result > 0) {
        res.json({ message: 'success', itemId });
        return;
      }
      res.json({ message: 'Не твоя, вот ты и бесишься' });
    } catch ({ message }) {
      res.json({ message });
    }
  });
module.exports = router;
