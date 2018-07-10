require('./connect')

const mongoose = require('mongoose')

const User_Schema = require('./schemas/user')
const User = mongoose.model('user', User_Schema)

const Chapter_Schema = require('./schemas/chapter')
const Chapter = mongoose.model('chapter', Chapter_Schema)

const Question_Schema = require('./schemas/questions')
const Question = mongoose.model('question', Question_Schema)

const Paper_Schema = require('./schemas/paper')
const Paper = mongoose.model('paper', Paper_Schema)

const PaperRecord_Schema = require('./schemas/paperRecord')
const PaperRecord = mongoose.model('paperRecord', PaperRecord_Schema)

const QuesRecord_Schema = require('./schemas/quesRecord')
const QuesRecord = mongoose.model('quesRecord', QuesRecord_Schema)

exports.User = User
exports.Chapter = Chapter
exports.Question = Question
exports.Paper = Paper
exports.PaperRecord = PaperRecord
exports.QuesRecord = QuesRecord