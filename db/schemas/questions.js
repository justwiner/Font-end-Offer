const mongoose = require('mongoose')

let Question_Schema = new mongoose.Schema({
  type: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  },
  answers: {
    type: Array,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  },
  createBy: {
    type: String,
    required: true
  },
  evaluation: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

exports = module.exports = Question_Schema