const express = require('express')
const router = express.Router()
const controller = require('./controller')
const { catchErrors } = require('../functions')

router.get('/', catchErrors(controller.getAllBooks))
router.get('/_id/:_id', catchErrors(controller.getBookById))
router.get('/book_id/:book_id', catchErrors(controller.getBookBybook_id))
router.post('/', catchErrors(controller.addBook))
router.put('/_id/:_id', catchErrors(controller.updateBook))
router.delete('/_id/:_id', catchErrors(controller.deleteBook))

module.exports = router
