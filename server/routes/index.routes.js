const router = require("express").Router();


// const apiQuestionsRouter = require('./api/api.questions.routes')
const apiAuthRouter = require("./api/api.auth.routes");
const apiUserRouter = require("./api/api.users.routes");
const apiItemsRouter = require('./api/api.items.routes')
const apiLikesRouter = require('./api/api.likes.routes')
const apiTasksRouter = require('./api/api.tasks.routes')
const apiTasksAnswerRouter = require('./api/api.answers.routes')
// const apiScoresRouter = require('./api/api.scores.routes'

// router.use('/api/questions', apiQuestionsRouter);
router.use("/api/auth", apiAuthRouter);
router.use("/api/users", apiUserRouter);
router.use("/api/items", apiItemsRouter);
router.use("/api/likes", apiLikesRouter);
router.use("/api/tasks", apiTasksRouter);
router.use("/api/answers", apiTasksAnswerRouter);
// router.use('api/scores', apiScoresRouter)


module.exports = router;
