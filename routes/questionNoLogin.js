const router = require('express').Router()
const QuestionNoLoginService = require('../service/questionNoLogin')

router.get('/chapters', async (req, res) => {
  res.json(await QuestionNoLoginService.getChapters())
})

exports = module.exports = router