const mongoose = require('mongoose')

const stackBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('StackBlog', stackBlogSchema)