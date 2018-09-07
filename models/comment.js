const mongoose = require('mongoose')
const { UserSchema } = require('../models/user')

const CommentSchema = mongoose.Schema({
  body: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  user: {
    type: UserSchema,
    required: true
  },
  created: {
    type: mongoose.Schema.Types.Date
  }
})

CommentSchema.pre('save', function (next) {
  if (!this.created) {
    this.created = new Date()
  }

  next()
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = { Comment, CommentSchema }
