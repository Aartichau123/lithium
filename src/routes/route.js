const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const { authentication , authorization } = require('../middleware/auth')

router.post('/register', userController.createUser)

router.post('/login', userController.userLogin)

router.post('/books', authentication , authorization , bookController.createBook)

router.get('/books', authentication , bookController.getAllBooks)

router.get('/books/:bookId', authentication , bookController.getBookById)

router.put('/books/:bookId' , authentication , authorization , bookController.updatebooks)

router.delete('/books/:bookId', authentication , authorization , bookController.deleteBook)

router.post('/books/:bookId/review', reviewController.createReview)

router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)

router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

module.exports = router