const router = require('express').Router()
const QuestionService = require('../service/questions')

router.post('/upload', async (req, res) => {
  res.json(await QuestionService.uploadQuestions(req.body, req.user._id))
})

exports = module.exports = router