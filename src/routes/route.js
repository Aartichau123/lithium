const { Router } = require('express')
const router = Router()
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')

router.post('/register', userController.createUser)

router.post('/login', userController.userLogin)

router.post('/books', bookController.createBook)

module.exports = router