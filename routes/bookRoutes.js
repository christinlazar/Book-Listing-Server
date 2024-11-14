
const express = require('express')
const bookRoute = express()
const bookController = require('../controller/bookController')
const userAuthMiddleware = require('../middleware/userAuth')
bookRoute.post('/register',bookController.registerUser)
bookRoute.post('/login',bookController.userLogin)
bookRoute.post('/addbook',userAuthMiddleware,bookController.addBook)
bookRoute.get('/books',userAuthMiddleware,bookController.getAllBooks)
bookRoute.post('/deleteBook',userAuthMiddleware,bookController.deleteBook)

module.exports = bookRoute