const mongoose = require('mongoose')
const { UserSchema } = require('../models/user')

const LikeSchema = mongoose.Schema({
  user: {
    type: UserSchema,
    required: true
  },
  created: {
    type: mongoose.Schema.Types.Date
  }
})

LikeSchema.pre('save', function (next) {
  if (!this.created) {
    this.created = new Date()
  }

  next()
})

const Like = mongoose.model('Like', LikeSchema)

module.exports = { Like, LikeSchema }
