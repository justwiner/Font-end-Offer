let UserService = (() => {
  const User = require('../db/mongoose-db').User
  const bcrypt = require('bcrypt')
  const config = require('../config')
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
  }
  return UserService
})()

exports = module.exports = UserService