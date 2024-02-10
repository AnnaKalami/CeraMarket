const {User, Answer, Question, Topic} = require('./db/models');

async function base () {
  const res = await Answer.findAll({include: {
    model: Question,
    attributes: ['point']
  }});
  return
}
