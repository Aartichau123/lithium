const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const { authentication } = require('../middleware/auth')

router.post('/register', userController.createUser)

router.post('/login', userController.userLogin)

router.post('/books', authentication , bookController.createBook)

router.get('/books', authentication , bookController.getAllBooks)

router.get('/books/:bookId', authentication , bookController.getBookById)

router.put('/books/:bookId' , authentication , bookController.updatebooks)

router.delete('/books/:bookId', authentication , bookController.deleteBook)

module.exports = router