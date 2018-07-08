const mongoose = require('mongoose')

let Paper_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: {
    type: Array,
    required: true
  },
  createAt: {
    type: Date,
    required: true
  },
  difficultyLevel: {
    type: Number,
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
  }
}, {
  versionKey: false
})

exports = module.exports = Paper_Schema