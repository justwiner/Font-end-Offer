require('./connect')

const mongoose = require('mongoose')

const User_Schema = require('./schemas/user')
const User = mongoose.model('user', User_Schema)

const Chapter_Schema = require('./schemas/chapter')
const Chapter = mongoose.model('chapter', Chapter_Schema)

exports.User = User
exports.Chapter = Chapter