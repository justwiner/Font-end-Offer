require('./connect')

const mongoose = require('mongoose')

const User_Schema = require('./schemas/user')
const User = mongoose.model('user', User_Schema)

exports.User = User