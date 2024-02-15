const router = require('express').Router();
const { Task, TaskGallery, TaskImage, TaskAnswer, TaskAtWork } = require('../../db/models');

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

  router.post('/', upload.any('img'), async (req, res) => {
    try {
      const {description, price} = req.body;
      //тут создание галлереии и картинки
      const task = await Task.create({description,price,user_id:res.locals.user.id, atWork:false, finished:false,confirmFinished:false});
      
      const createGallery = await TaskGallery.create({task_id:task.id})
      
      await Promise.all(req.files.map(async (img) => {
        await TaskImage.create({ path: `/img/${img.filename}`, taskGallery_id: createGallery.id });
      }));

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
      const result = await Task.destroy({ where: { id: taskId , atWork:false, user_id:res.locals.user.id} });
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
        if (!task.atWork) {
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
        if (task.atWork) {
          const [result] = await Task.update(
            {atWork:false},{where:{id:taskId}});
            if (result>0){
              const resultDestroy =  await TaskAtWork.destroy({ where: { task_id: task.id, user_id:res.locals.user.id} });
              if (resultDestroy>0){
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
        }
      }
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });


  router.put('/atWork/finished/:taskId', async (req, res) => {
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
        if (!task.finished) {
          const [result] = await Task.update(
            {finished:true},{where:{id:taskId}});
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
        if (task.finished) {
          const [result] = await Task.update(
            {finished:false},{where:{id:taskId}});
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
      }
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });
  
  router.put('/atWork/confirmFinished/:taskId', async (req, res) => {
    try {
      const {taskId} = req.params;
      const task = await Task.findOne({where: {id: taskId}, include: [
        {
          model: TaskGallery,
          include: TaskImage
        },
        TaskAnswer,
        TaskAtWork]})
        console.log(task.confirmFinished);
      if (task.user_id===res.locals.user.id) {
        if (!task.confirmFinished) {
          const [result] = await Task.update(
            {confirmFinished:true},{where:{id:taskId}});
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
        if (task.confirmFinished) {
          const [result] = await Task.update(
            {confirmFinished:false},{where:{id:taskId}});
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
      }
    } catch ({ message }) {
      res.json({ type: 'tasks router', message });
    }
  });


module.exports = router;
