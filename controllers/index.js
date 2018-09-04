const { User } = require('../models/user')

exports.index = (req, res, next) => {
	res.render('index.ejs')
}

exports.profile = (req, res, next) => {
	const userId = req.session.userId
	User.findOne({_id: userId})
		.exec()
		.then(user => {
			if(user) {
				res.render('profile.ejs', {user})
			}
		})
		.catch(err => {
			console.log(err)
		})

}
