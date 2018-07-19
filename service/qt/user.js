let UserService = (() => {
  const User = require('../../db/mongoose-db').User
  const Question = require('../../db/mongoose-db').Question
  const Paper = require('../../db/mongoose-db').Paper
  const QuesRecord = require('../../db/mongoose-db').QuesRecord
  const PaperRecord = require('../../db/mongoose-db').PaperRecord
  const bcrypt = require('bcrypt')
  const config = require('../../config')
  const fs = require('fs')
  const path = require('path')
  class UserService {
    static async modifyPass (oldPass, newPass, userId) {
      try {
        const user = await User.findOne({ _id: userId })
        const result = await bcrypt.compare(oldPass, user.password);
        if (!result) {
          return { success: false, message: '原密码输入有误!'}
        }
        const saltRounds = 5;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(newPass, salt);
        await User.update({ _id: userId },{ password: hash })
        return {success: true, message: '密码修改成功。'}
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async uploadAvatar (avatar, user) {
      try {
        const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
        const dataBuffer = new Buffer(base64Data, 'base64');
        const savePath = path.join(__dirname,'../../../upload/avatar')
        await fs.writeFileSync(`${savePath}/${user.eMail}.png`, dataBuffer)
        await User.update({_id: user._id}, { avatar: `${config.user.baseAvatarUrl}${user.eMail}.png` })
        return { 
          success: true,
          message: '头像上传成功！',
          avatar: `${config.user.baseAvatarUrl}${user.eMail}.png`
        }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async userInfo (userId) {
      try {
        const user = await User.findOne({_id: userId})
        return {
          success: true,
          message: '获取用户信息成功',
          user
        }
      } catch (e) {
        console.log(e)
        return error
      }
    }
    static async modify (newUser, userId) {
      try {
        const {nickName, gender, address, education, school, expecteCompany, graduateTime} = newUser
        let saveUser = {
          nickName
        }
        if (gender) saveUser = Object.assign({}, { gender }, saveUser)
        if (address) saveUser = Object.assign({}, { address }, saveUser)
        if (education) saveUser = Object.assign({}, { education }, saveUser)
        if (school) saveUser = Object.assign({}, { school }, saveUser)
        if (expecteCompany) saveUser = Object.assign({}, { expecteCompany }, saveUser)
        if (graduateTime) saveUser = Object.assign({}, { graduateTime }, saveUser)
        await User.update({ _id: userId }, saveUser)
        return { success: true, message: '修改信息成功！' }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async likes (userId) {
      try {
        return {
          success: true,
          message: 'API未实现',
        }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async dislikes (userId) {
      try {
        return {
          success: true,
          message: 'API未实现',
        }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async contributes (userId) {
      try {
        const [questions, papers] = await Promise.all([
          Question.find({createBy: userId}),
          Paper.find({createBy: userId})
        ])
        return {
          success: true,
          message: '查询用户贡献信息成功',
          data: {
            questions,
            papers
          }
        }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
    static async tests (userId) {
      try {
        const [testQuestions, testPapers] = await Promise.all([
          QuesRecord.find({createBy: userId}),
          PaperRecord.find({createBy: userId})
        ])
        return {
          success: true,
          message: '查询用户做题记录成功',
          data: {
            testQuestions,
            testPapers
          }
        }
      } catch (e) {
        console.log(e)
        return config.error
      }
    }
  }
  return UserService
})()

exports = module.exports = UserService