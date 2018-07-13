const mongoose = require('mongoose')

let PaperRecord_Schema = new mongoose.Schema({
  createAt: {
    type: Date,
    required: true
  },
  createBy: {
    type: String,
    required: true
  },
  paperId: {
    type: String,
    required: true
  },
  correctRate: {
    type: Number,
    required: true
  },
  result: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

exports = module.exports = PaperRecord_Schema