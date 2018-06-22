const express = require('express')
const router = express.Router()

router.post('/info', (req, res, next) => {
  res.json({success: true, message: 'Api可以使用'})
})

exports = module.exports = router