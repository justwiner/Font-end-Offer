const router = require('express').Router()
const QuestionService = require('../service/questions')

router.post('/upload', async (req, res) => {
  res.json(await QuestionService.uploadQuestions(req.body, req.user._id))
})
router.post('/doQuesAtOnce', async (req, res) => {
  const {currentChapter, currentDifficults, questionNum} = req.body
  res.json(await QuestionService.doQuestionsAtOnce(currentChapter, currentDifficults, questionNum))
})

exports = module.exports = router