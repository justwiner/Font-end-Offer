const router = require('express').Router()
const QuestionService = require('../service/questions')

router.post('/upload', async (req, res) => {
  res.json(await QuestionService.uploadQuestions(req.body, req.user._id))
})

router.post('/doQuesAtOnce', async (req, res) => {
  const {currentChapter, currentDifficults, questionNum} = req.body
  res.json(await QuestionService.doQuestionsAtOnce(currentChapter, currentDifficults, questionNum))
})

router.post('/likeIt', async (req, res) => {
  const {questionId} = req.body
  res.json(await QuestionService.likeIt(questionId,  req.user._id))
})

router.post('/dislikeIt', async (req, res) => {
  const {questionId} = req.body
  res.json(await QuestionService.dislikeIt(questionId,  req.user._id))
})

exports = module.exports = router