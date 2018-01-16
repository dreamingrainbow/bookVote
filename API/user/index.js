const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { catchErrors } = require('../functions')

router.post('/new', catchErrors(controller.newUser))
router.post('/login', catchErrors(controller.login))

module.exports = router
