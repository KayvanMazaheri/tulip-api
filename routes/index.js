const router = require('express').Router()
const { index, profile } = require('../controllers')

router.get('/', index)
router.get('/profile', profile)

module.exports = router
