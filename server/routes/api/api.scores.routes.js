const router = require('express').Router();
const {User} = require('../../db/models')

router.get('/', async (req, res) => {
  try {
    const user = await User.findOne({where: {id: res.locals.user.id}})
  res.json({user})
  } catch ({message}) {
    res.json({message})
  }
})

module.exports = router