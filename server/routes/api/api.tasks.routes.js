const router = require('express').Router();
const { Task, TaskGallery, TaskImage, TaskAnswer } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: TaskGallery,
            include: TaskImage
          },
          TaskAnswer]
        
      });
      res.json({ tasks });
    } catch ({ message }) {
      res.json({ type: 'task router', message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const {description, price} = req.body;
      //тут создание галлереии и картинки
      const task = await Task.create({description,price,user_id:res.locals.user.id,});
      const createGallery = await TaskGallery.create({task_id:task.id})
      const newTask = await Task.findOne({where: { user_id:res.locals.user.id,id:task.id }, include: {
        model: TaskGallery,
        include: TaskImage
      }});
      res.json({task:newTask});
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });


  router.delete('/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const result = await Task.destroy({ where: { id: taskId , user_id:res.locals.user.id} });
      if (result > 0) {
        res.json({ message: 'success', taskId });
        return;
      }
      res.json({ message: 'Не твоя, вот ты и бесишься' });
    } catch ({ message }) {
      res.json({ message });
    }
  });
module.exports = router;
