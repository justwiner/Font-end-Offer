const router = require('express').Router()
const QuestionNoLoginService = require('../service/questionNoLogin')

router.get('/chapters', async (req, res) => {
  res.json(await QuestionNoLoginService.getChapters())
})

router.post('/questions', async (req, res) => {
  const {currentChapter, currentDifficults, currentSortBy, size, page, key} = req.body
  res.json(await QuestionNoLoginService.getQuestions(currentChapter, currentDifficults, currentSortBy, size, page, key))
})

router.post('/questionsByIds', async (req, res) => {
  const {ids} = req.body
  res.json(await QuestionNoLoginService.getQuestionsByIds(ids))
})

exports = module.exports = router