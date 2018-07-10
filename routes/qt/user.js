const express = require('express')
const router = express.Router()
const UserService = require('../../service/qt/user')

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

router.get('/info', async (req, res) => {
  res.json(await UserService.userInfo(req.user._id))
})

router.post('/modify', async (req, res) => {
  const {nickName, gender, address, education, school, expecteCompany, graduateTime} = req.body
  res.json(await UserService.modify({nickName, gender, address, education, school, expecteCompany, graduateTime} ,req.user._id))
})

exports = module.exports = router