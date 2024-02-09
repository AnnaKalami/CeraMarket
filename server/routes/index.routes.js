const router = require("express").Router();

// const apiQuestionsRouter = require('./api/api.questions.routes')
const apiAuthRouter = require('./api/api.auth.routes')
// const apiScoresRouter = require('./api/api.scores.routes'

// router.use('/api/questions', apiQuestionsRouter);
router.use("/api/auth", apiAuthRouter);
// router.use('api/scores', apiScoresRouter)

module.exports = router;
