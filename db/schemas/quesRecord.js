const mongoose = require('mongoose')

let QuesRecord_Schema = new mongoose.Schema({
  createAt: {
    type: Date,
    required: true
  },
  createBy: {
    type: String,
    required: true
  },
  questionId: {
    type: String,
    required: true
  },
  result: {
    type: Boolean,
    required: true
  }
}, {
  versionKey: false
})

exports = module.exports = QuesRecord_Schema