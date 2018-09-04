const router = require('express').Router()
const { signin, signup, signout } = require('../controllers/auth')

router.get('/signup', (req, res) => {
	res.render('signup.ejs')
})
router.post('/signup', signup)
router.get('/signin', (req, res) => {
	res.render('signin.ejs')
})
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router
