const mongoose = require('mongoose')

let Chapter_Schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  }, 
  title: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

exports = module.exports = Chapter_Schema