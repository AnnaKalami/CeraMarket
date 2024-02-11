const router = require('express').Router();
const { Task, TaskGallery, TaskImage, TaskAnswer, TaskAtWork } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: TaskGallery,
            include: TaskImage
          },
          TaskAnswer,
        TaskAtWork]
        
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
      const task = await Task.create({description,price,user_id:res.locals.user.id, atWork:false});
      const createGallery = await TaskGallery.create({task_id:task.id})
      const newTask = await Task.findOne({where: { user_id:res.locals.user.id,id:task.id }, include: [
        {
          model: TaskGallery,
          include: TaskImage
        },
        TaskAnswer,
        TaskAtWork]});
      res.json({task:newTask});
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });
  
  
  router.delete('/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      if (res.locals.user.isAdmin){
        const result = await Task.destroy({ where: { id: taskId} });
        if (result > 0) {
          res.json({ message: 'success', taskId });
          return;
        }
      }
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



  router.post('/atWork', async (req, res) => {
    try {
      const {userId,taskId} = req.body;
      const task = await Task.findOne({where: {id: taskId}});
      if (task.user_id===res.locals.user.id) {
        const taskAtWork = await TaskAtWork.create({user_id:userId, task_id:taskId})
        const newTask = await Task.findOne({where: { user_id:res.locals.user.id,id:task.id }, include: [
          {
            model: TaskGallery,
            include: TaskImage
          },
          TaskAnswer,
          TaskAtWork]})
          res.json({task:newTask});
        
      }
      
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });
  
  router.put('/atWork/:taskId', async (req, res) => {
    try {
      const {taskId} = req.params;
      const task = await Task.findOne({where: {id: taskId}, include: [
        {
          model: TaskGallery,
          include: TaskImage
        },
        TaskAnswer,
        TaskAtWork]})
      if (task.TaskAtWork.user_id===res.locals.user.id) {
        const [result] = await Task.update(
          {atWork:true},{where:{id:taskId}});
          if (result>0){
            const newTask = await Task.findOne({where: {id:taskId }, include: [
              {
                model: TaskGallery,
                include: TaskImage
              },
              TaskAnswer,
            TaskAtWork]
          })
            res.json({task:newTask});
            return
          }
      }
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });


module.exports = router;
