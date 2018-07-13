const router = require('express').Router()
const RecordService = require('../../service/qt/record')

router.post('/save', async (req, res) => {
  const {type, data, paperSaveInfo} = req.body
  res.json(await RecordService.saveRecords(type, data, paperSaveInfo, req.user._id))
})

exports = module.exports = router