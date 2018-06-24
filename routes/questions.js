const router = require('express').Router()
const QuestionService = require('../service/questions')

router.post('/uploadQuestions', async (req, res) => {
  res.json(await QuestionService.uploadQuestions(req.body))
})

exports = module.exports = router