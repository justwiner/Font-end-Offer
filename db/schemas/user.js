const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let User_Schema = new mongoose.Schema({
  avatar: {
    type: String
  },
  nickName: {
    type: String,
    required: true
  },
  eMail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  islive: {
    type: Boolean,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  }
}, {
  versionKey: false
})


// 验证保存之前，对密码进行加密
let SALT_WORK_FACTOR = 5
User_Schema.pre('save', function(next) {
    var user = this;

    //产生密码hash当密码有更改的时候(或者是新密码)
    if (!user.isModified('password')) return next();

    // 产生一个salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //  结合salt产生新的hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // 使用hash覆盖明文密码
            user.password = hash;
            next();
        });
    });
})

exports= module.exports = User_Schema