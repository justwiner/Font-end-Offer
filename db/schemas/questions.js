const mongoose = require('mongoose')

let Question_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  sort: {
    type: Number,
    required: true
  },
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
    type: String
  }
}, {
  versionKey: false
})

exports = module.exports = Question_Schema