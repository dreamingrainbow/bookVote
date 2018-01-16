const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { catchErrors } = require('../functions')

router.post('/', catchErrors(controller.vote))

module.exports = router
