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
      if(res.locals.user.isMaster) {
        const item = await Item.create({description,price,user_id:res.locals.user.id,});
      const createGallery = await ItemGallery.create({item_id:item.id})
      const newItem = await Item.findOne({where: { user_id:res.locals.user.id,id:item.id }, include: {
        model: ItemGallery,
        include: ItemImage
      }});
      res.json({item:newItem});
      }
    } catch ({ message }) {
      res.json({ type: 'items router', message });
    }
  });
  
  router.put('/:itemId', async (req, res) => {
    try {
      const {itemId}= req.params
      const {description, price } = req.body;
      //тут создание галлереии и картинки
      const [result] = await Item.update(
        {description, price},{where:{user_id:res.locals.user.id, id:itemId}});
        if (result>0){
          const newItem = await Item.findOne({where: { user_id:res.locals.user.id,id:itemId }, include: {
            model: ItemGallery,
            include: ItemImage
          }});
          res.json({item:newItem});
          return
        }
    } catch ({ message }) {
      res.json({ type: 'items router', message });
    }
  });

  router.delete('/:itemId', async (req, res) => {
    try {
      const { itemId } = req.params;
      if (res.locals.user.isAdmin){
        const result = await Item.destroy({ where: { id: itemId} });
        if (result > 0) {
          res.json({ message: 'success', itemId });
          return;
        }
      }
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
