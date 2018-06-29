const router = require('express').Router()
const PaperService = require('../service/paper')

router.post('/likeIt', async (req, res) => {
  const {paperId} = req.body
  res.json(await PaperService.likeIt(paperId,  req.user._id))
})

router.post('/dislikeIt', async (req, res) => {
  const {paperId} = req.body
  res.json(await PaperService.dislikeIt(paperId,  req.user._id))
})


exports = module.exports = router