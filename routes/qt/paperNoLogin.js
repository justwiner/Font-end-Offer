const router = require('express').Router()
const PaperNoLoginService = require('../../service/qt/paperNoLogin')

router.post('/getPapers', async (req, res) => {
  const {currentDifficults, sortBy, size, page, key} = req.body
  res.json(await PaperNoLoginService.getPapers(currentDifficults, sortBy, size, page, key))
})

router.post('/getLike', async (req, res) => {
  const {paperId} = req.body
  res.json(await PaperNoLoginService.getLike(paperId))
})

router.post('/getDislike', async (req, res) => {
  const {paperId} = req.body
  res.json(await PaperNoLoginService.getDislike(paperId))
})

router.post('/papersByIds', async (req, res) => {
  const {ids} = req.body
  res.json(await PaperNoLoginService.getPapersByIds(ids))
})

exports = module.exports = router