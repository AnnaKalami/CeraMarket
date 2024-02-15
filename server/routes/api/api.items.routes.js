const router = require('express').Router();
const { Item, ItemGallery, ItemImage } = require('../../db/models');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img');
  },
  filename: function (req, file, cb) {
    const millDate = new Date().getMilliseconds();
    const uniqueFilename = `${millDate}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({ storage });

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

  router.post('/', upload.any('img'), async (req, res) => {
    try {
      const {description, price,name } = req.body;
      console.log(req.files);
      // const newFileUrl = `/img/${req.files.originalname}`;
      //тут создание галлереии и картинки
      // console.log(res.locals.user.isMaster);
      if(res.locals.user.isMaster) {
        const item = await Item.create({name,description,price,user_id:res.locals.user.id,})
        
      const createGallery = await ItemGallery.create({item_id:item.id})

      // const millDate = new Date().getMilliseconds();
      // let newImage
    //  await req.files.map(async (img) =>   await ItemImage.create({path:`/img/${img.filename}`,itemGallery_id:createGallery.id}))
    await Promise.all(req.files.map(async (img) => {
      await ItemImage.create({ path: `/img/${img.filename}`, itemGallery_id: createGallery.id });
    }));
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
  
  router.put('/:itemId',upload.any('img'), async (req, res) => {
    try {
      // const {itemId}= req.params
      // console.log(req.body);
      // console.log(req.files);
      const {name,description, price, itemId, imgIds } = req.body;
      //тут создание галлереии и картинки
      const [result] = await Item.update(
        {description, price,name},{where:{user_id:res.locals.user.id, id:itemId}});
        if (result>0){
          const currentGallery = await ItemGallery.findOne({where: {item_id:itemId}})

          await Promise.all(req.files.map(async (img) => {
            await ItemImage.create({ path: `/img/${img.filename}`, itemGallery_id: currentGallery.id });
          }))
          if (Array.isArray(imgIds)&&imgIds) {
            await Promise.all(imgIds.map(async (imgId) => {
              await ItemImage.destroy({ where: { id: +imgId, itemGallery_id: currentGallery.id } });
            }));
          } else if (!Array.isArray(imgIds)&&imgIds) {
            await ItemImage.destroy({ where: { id: +imgIds, itemGallery_id: currentGallery.id } });
          }

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
