let CommonService = ( ()=> {

  const User = require('../db/mongoose-db').User
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const config = require('../config')
  const error = { success: false, message: '服务器出了一点问题，请稍后重试!' }

  class CommonService {
    static async login (eMail, password) {
      try {
        const user = await User.findOne( { eMail } )
        if ( user === null ) {
          return { success: false, message: '未找到此用户!' }
        }
        const result = await bcrypt.compare(password, user.password);
        if ( !result ) {
          return { success: false, message: '邮箱与密码不匹配!' }
        }
        const { nickName, avatar, _id } = user
        const token = jwt.sign({nickName, eMail: user.eMail}, config.tokenSet.jwtsecret, {expiresIn : config.tokenSet.time});
        return { 
          success: true, 
          message: '登录成功!',
          token,
          user: { nickName, avatar, eMail, _id }
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async register (nickName, eMail, password) {
      try {
        await User.create({
          nickName,
          eMail,
          password,
          avatar : config.user.defaultHead
        })
        return { success: true, message: '注册成功!' }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async checkEMail (eMail) {
      try {
        const user = await User.findOne({eMail})
        if (user === null) {
          return { success: true, message: '此邮箱可以注册!' }
        }
        return { success: false, message: '此邮箱已被注册!' }
      } catch (e) {
        console.log(e)
        return error
      }
    }
  }
  return CommonService
} )()

exports = module.exports = CommonService