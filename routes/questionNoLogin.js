const router = require('express').Router()
const QuestionNoLoginService = require('../service/questionNoLogin')

router.get('/chapters', async (req, res) => {
  res.json(await QuestionNoLoginService.getChapters())
})

router.post('/questions', async (req, res) => {
  const {currentChapter, currentDifficults, currentSortBy, size, page, key} = req.body
  res.json(await QuestionNoLoginService.getQuestions(currentChapter, currentDifficults, currentSortBy, size, page, key))
})

router.post('/papers', async (req, res) => {
  const {currentDifficults, size, page, key} = req.body
  res.json(await QuestionNoLoginService.getPapers(currentDifficults, key))
})

exports = module.exports = router