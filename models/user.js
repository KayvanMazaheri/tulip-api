var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  }
})

// authenticate input against database
UserSchema.statics.authenticate = function (email, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ email })
      .exec()
      .then(user => {
        if (!user) {
          var err = new Error('User not found.')
          err.status = 401
          reject(err)
        }

        bcrypt.compare(password, user.password)
          .then(result => {
            if (result === true) {
              resolve(user)
            } else {
              var err = new Error('User name or password is incorrect')
              reject(err)
            }
          })
      })
      .catch(err => {
        reject(err)
      })
  })
}

// hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => {
      next(err)
    })
})

module.exports = {
  User: mongoose.model('User', UserSchema),
  UserSchema
}
