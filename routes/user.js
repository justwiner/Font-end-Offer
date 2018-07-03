const express = require('express')
const router = express.Router()
const UserService = require('../service/user')

router.post('/info', (req, res, next) => {
  res.json({success: true, message: 'Api可以使用'})
})

router.post('/pass', async (req, res) => {
  const { oldPass, newPass } = req.body
  res.json(await UserService.modifyPass(oldPass, newPass, req.user._id))
})

router.post('/avatar', async (req, res) => {
  const { avatar } = req.body
  res.json(await UserService.uploadAvatar(avatar, req.user))
})

exports = module.exports = router