const { Story } = require('../models/story')
const { User } = require('../models/user')

exports.create = (req, res, next) => {
  const userId = req.session.userId
  console.log(userId)
  User.findOne({ _id: userId })
    .exec()
    .then(user => {
      if (user) {
        const story = new Story({
          body: req.body.body,
          user
        })

        story.save(function (err) {
          if (err) throw err
          // saved!
        })
        res.send('ok')
      }
    })
    .catch(err => {
      console.log(err)
    })
}
