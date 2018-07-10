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
  }
}, {
  versionKey: false
})

exports = module.exports = PaperRecord_Schema