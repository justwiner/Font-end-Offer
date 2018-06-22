const express = require('express')
const router = express.Router()
const CommonService = require('../service/common')

router.post('/login',async (req, res, next) => {
  const { eMail, password } = req.body
  const result = await CommonService.login( eMail, password )
  res.json(result)
})

router.post('/register',async (req, res, next) => {
  const { nickName, eMail, password } = req.body
  const result = await CommonService.register( nickName, eMail, password )
  res.json(result)
})

router.post('/checkEMail', async (req, res, next) => {
  const { eMail } = req.body
  const result = await CommonService.checkEMail( eMail )
  res.json(result)
})

exports = module.exports = router