let CommonService = ( ()=> {

  const User = require('../db/mongoose-db').User
  const bcrypt = require('bcrypt')
  const moment = require('moment')
  const jwt = require('jsonwebtoken')
  const opn = require('opn')
  const config = require('../config')
  const send = require('../lib/email')
  const error = config.error

  class CommonService {
    static async login (eMail, password) {
      try {
        const user = await User.findOne( { eMail } )
        if ( user === null ) {
          return { success: false, message: '未找到此用户!', status: 0 }
        }
        if (!user.islive) {
          const activeToken = jwt.sign({eMail}, config.email.jwtsecret, {expiresIn : config.email.time});
          CommonService.sendEActiveMail(eMail, activeToken)
          return { success: false, message: '此账号虽然已注册，但未通过邮箱激活，暂无法使用。激活邮件已重新发送，请去激活.' , status: 1}
        }
        const result = await bcrypt.compare(password, user.password);
        if ( !result ) {
          return { success: false, message: '邮箱与密码不匹配!' , status: 2}
        }
        const { nickName, avatar, _id } = user
        const token = jwt.sign({nickName, _id, eMail: user.eMail}, config.tokenSet.jwtsecret, {expiresIn : config.tokenSet.time});
        return { 
          success: true, 
          message: '登录成功!',
          token,
          user: { nickName, avatar, eMail }
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async register (nickName, eMail, password) {
      try {
        const result = await CommonService.checkEMail(eMail)
        if ( result.success ) {
          const avatar = config.user.defaultHead
          await User.create({
            nickName,
            eMail,
            password,
            avatar,
            code: nickName,
            islive: false,
            createAt: moment().format('YYYY-MM-DD HH:mm:ss')
          })
          const token = jwt.sign({eMail}, config.email.jwtsecret, {expiresIn : config.email.time});
          CommonService.sendEActiveMail(eMail, token)
          return { 
            success: true, 
            message: '注册成功,请在邮箱中激活账号!'
          }
        } else {
          return result
        }
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
    static sendEActiveMail (email, token) {
      const eMail = {
        from: 'Font Family <luywfront@163.com>',
        subject: '激活账号',
        to: email,
        html: `
        <p>亲爱的：${email}</p>
        <p><a href="http://localhost:2222/api/common/checkActive?email=${email}&token=${token}">点击这里，立即激活你的账号</a></p>
        `
      }
      send(eMail)
    }
    static async checkActive (email, token) {
      try {
        if ( token ) {
          // 解码 token (验证 secret 和检查有效期（exp）)
          jwt.verify(token, config.email.jwtsecret, async (err, decoded) => {
            if (err) {
              return { success: false, message: '无效的token！' }
            } else {
              const user = await User.findOne({eMail: email})
              if (user === null) {
                return { success: false, message: '找不到此用户！' }
              }
              await User.update({eMail: email}, {islive: true})
              opn(config.front_url)
              return { success: true, message: '激活成功！' }
            }
          })
        } else {
          return { success: false, message: '无效的token！' }
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async findPass (email) {
      try {
        const result = await CommonService.checkEMail(email)
        if (result.success) {
          return { success: false, message: '此邮箱并未注册，无法进行找回密码操作。' }
        } else {
          const ran = 'abcdefghijklmnopqrstuvwxyz0123456789'
          const length = ran.length
          let randomPass = ''
          for (let i = 0; i < 8; i++) {
            randomPass += ran[Math.floor(Math.random() * length)]
          }
          const saltRounds = 5;
          const salt = bcrypt.genSaltSync(saltRounds);
          const hash = bcrypt.hashSync(randomPass, salt);
          await User.update({eMail: email}, { password: hash })
          const eMail = {
            from: 'Font Family <luywfront@163.com>',
            subject: '重置密码',
            to: email,
            html: `
            <p>亲爱的：${email}</p>
            <p>您的密码已重置为：<font style="font-weight:blod">${randomPass}</font></p>
            `
          }
          send(eMail)
          return {success: true, message: '重置密码成功，新密码已发送至你的邮箱。'}
        }
      } catch (e) {
        return error
      }
    }
  }
  return CommonService
} )()

exports = module.exports = CommonService