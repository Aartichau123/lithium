const jwt = require('jsonwebtoken')
const { isValidObjectId } = require('mongoose')
const userModel = require('../models/userModel')
const bookModel = require('../models/bookModel')

const authentication = function (req, res, next) {

    try {

    let token = req.headers["x-api-key"]

    if (!token) return res.status(400).send({ status : false, message : "Token must be present !!!" })

    jwt.verify(token, "bookmanagement" , function (err, decodedToken) {
        if (err) return res.status(401).send({ status : false , message : "Token is invalid !!!" })
        req.loggedInUser = decodedToken.userId
        next()
    })

} catch (err){
    res.status(500).send({ status : false , message : err.message })
}
}

const authorization = async function (req, res, next) {

    try {
    
    let bookId = req.params.bookId
    let userId = req.body.userId
    
    if(bookId){

        if(!isValidObjectId(bookId)) return res.status(400).send({ status : false , message : "BookId id not valid ObjectId !!!" })

        const books = await bookModel.findById(bookId)
        if (!books) return res.status(404).send({ status : false , message : "Book not found !!!" })

        if(books.userId != req.loggedInUser) return res.status(403).send({ status : false , message : "Not Authorized !!!" })
    }

    if(userId){

        if(!isValidObjectId(userId)) return res.status(400).send({ status : false , message : "UserId id not valid ObjectId !!!" })

        let user = await userModel.findById(userId)
        if (!user)  return res.status(404).send({ status : false , message : "User not found !!!" })

        if(userId != req.loggedInUser) return res.status(403).send({ status : false , message : "Not Authorized !!!" })    
    }

    next()

    } catch (err) {
        return res.status(500).send({ status : false , error : err.message })
    }
}

module.exports = { authentication , authorization }