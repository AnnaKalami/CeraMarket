const router = require("express").Router();


// const apiQuestionsRouter = require('./api/api.questions.routes')
const apiAuthRouter = require("./api/api.auth.routes");
const apiUserRouter = require("./api/api.users.routes");
const apiItemsRouter = require('./api/api.items.routes')
// const apiScoresRouter = require('./api/api.scores.routes'

// router.use('/api/questions', apiQuestionsRouter);
router.use("/api/auth", apiAuthRouter);
router.use("/api/users", apiUserRouter);
router.use("/api/items", apiItemsRouter);
// router.use('api/scores', apiScoresRouter)


module.exports = router;
