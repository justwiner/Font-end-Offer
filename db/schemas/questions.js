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
  chapter: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: Number,
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
  like: {
    type: Array,
    required: true
  },
  dislike: {
    type: Array,
    required: true
  },
  likeNum: {
    type: Number,
    required: true
  },
  dislikeNum: {
    type: Number,
    required: true
  },
  complexValue: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
})

exports = module.exports = Question_Schema