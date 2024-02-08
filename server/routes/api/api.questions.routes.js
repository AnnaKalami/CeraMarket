const router = require('express').Router();
const { Topic, Question, Answer, User } = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: Question,
          attributes: ['id', 'text', 'topicId', 'point', 'rightAnswer'],
        },
      ],
    });
    res.json({ topics })
  } catch ({ message }) {
    res.json({ message })
  }
})

router.get('/answers', async (req, res) => {
try {
  const answers = await Answer.findAll({where: {userId: res.locals.user.id}})
  res.json({answers})
} catch ({message}) {
  res.json({message})
}
})

router.post('/', async (req, res) => {

  try {
    const { answer, questionId } = req.body
    const question = await Question.findOne({ where: { id: questionId } })
    const user = await User.findOne({where: {id: res.locals.user.id}})
    if (question.rightAnswer === answer) {
      const answer = await Answer.create({ isTrue: true, userId: res.locals.user.id, questionId })
      await User.update({score: user.score + question.point}, {where: {id: res.locals.user.id}})
      res.json({ answer })
    } else {
      const answer = await Answer.create({ isTrue: false, userId: res.locals.user.id, questionId })
      res.json({ answer })
    }
  } catch ({ message }) {
    res.json({ message })
  }

})

module.exports = router