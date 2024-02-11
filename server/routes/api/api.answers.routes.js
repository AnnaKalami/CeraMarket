const router = require('express').Router();
const { TaskGallery,TaskImage, TaskAnswer, Task } = require('../../db/models');

router.post('/', async (req, res) => {
    try {
      const {text, price, task_id} = req.body;
      //тут создание галлереии и картинки
      if (res.locals.user.isMaster){
        const answer = await TaskAnswer.create({text,price,user_id:res.locals.user.id,task_id});
        const task = await Task.findOne({
          where: { id: task_id }, include: [
            {
             model: TaskGallery,
              include: TaskImage
            },
          TaskAnswer
        ]
      })
      res.json({task});
      }
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });

  module.exports = router;
