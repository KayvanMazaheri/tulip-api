const router = require('express').Router()
const { create } = require('../controllers/story')

router.post('/create', create)

module.exports = router
