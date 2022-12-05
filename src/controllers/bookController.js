const { isValidObjectId } = require('mongoose')
const moment = require('moment')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel.js')
const { isValidString , isIsbn , isValidDate } = require('../validations/validation')

const createBook = async function(req , res){

    try {

    let data = req.body
    let { title , excerpt , userId , ISBN , category , subcategory , releasedAt } = data

    if (!title || !isValidString(title)) return res.status(400).send({ status : false , message : "Title is required !!!" })
    if (!excerpt || !isValidString(excerpt)) return res.status(400).send({ status : false , message : "Excerpt is required !!!" })
    if (!userId || !isValidString(userId)) return res.status(400).send({ status : false , message : "UserId number is required !!!" })
    if (!ISBN || !isValidString(ISBN)) return res.status(400).send({ status : false , message : "ISBN is required !!!" })
    if (!category || !isValidString(category)) return res.status(400).send({ status : false , message : "Category is required !!!" })
    if (!subcategory || !isValidString(subcategory)) return res.status(400).send({ status : false , message : "Subcategory is required !!!" })
    if (!releasedAt || !isValidString(releasedAt)) return res.status(400).send({ status : false , message : "Released date is required !!!" })

    let titleCheck = await bookModel.findOne({title})
    if(titleCheck) return res.status(400).send({ status : false , message : "Title already in use !!!" })

    if(!isValidObjectId(userId)) res.status(400).send({ status : false , message : "UserId is not a valid ObjectId !!!" })
    let userIdCheck = await userModel.findById(userId)
    if(!userIdCheck) return res.status(404).send({ status : false , message : "UserId does not exist !!!" })


    if (isIsbn(ISBN)) return res.status(400).send({ status : false , message : "Please enter a valid ISBN  Its contain 10 or 13 digit !!!"  })
    let ISBNCheck = await bookModel.findOne({ISBN})
    if(ISBNCheck) return res.status(400).send({ status : false , message : "ISBN already in use !!!" })

    releasedAt = moment(releasedAt).format('YYYY-MM-DD')

    savedData = await bookModel.create(data)

    res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

// ===============================getUsers==========================

const getAllBooks = async function (req , res) {

    try {

    let filter = req.query
    let { category , userId , subcategory } = filter

    if(category){
        if(!isValidString(category)) return res.status(400).send({ status : false , message : "Category is required !!!" })
    }

    if(userId){
        if(!isValidObjectId(userId)) res.status(400).send({ status : false , message : "UserId is not a valid ObjectId !!!" })
        let userIdCheck = await userModel.findById(userId)
        if (!userIdCheck) { return res.status(404).send({ status : false, message : "UserId does not exist !!!" }) }
    }

    if(subcategory){
        if(!isValidString(category)) return res.status(400).send({ status : false , message : "Sub Category is required !!!" })
    }

    filter.isDeleted = false

    let bookDetails = await bookModel.find(filter).select({ title : 1 , excerpt : 1 , userId : 1 , category : 1 , reviews : 1 , releasedAt : 1 }).sort({ title : 1 })

    if (bookDetails.length == 0) return res.status(404).send({ status : false , message : "No books available." })

    res.status(200).send({ status : true , message : "Book list" , data : bookDetails })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

// =========================get Books By Id=========================================================

const getBookById = async function(req , res){

    try {

        let bookId = req.params.bookId

        if(!isValidObjectId(bookId)) res.status(400).send({ status : false , message : "BookId is not a valid ObjectId !!!" })

        let bookData = await bookModel.findById(bookId).select({ ISBN : 0 , __v : 0 }).lean()
        if (!bookData) return res.status(404).send({ status : false, message : "Book not found !!!" })

        let reviewData = await reviewModel.find({ bookId , isDeleted : false }).select({ isDeleted : 0 , createdAt : 0 , updatedAt : 0 , __v : 0 })

        bookData.reviewsData = reviewData

        res.status(200).send({ status : true , message : "Book list" , data : bookData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

// =========================update Books=========================================================

const updatebooks = async function (req , res) {

    try {

    let bookId = req.params.bookId
    let data = req.body
    let { title, excerpt, ISBN, releasedAt } = data

    if(Object.keys(data).length === 0) return res.status(400).send({ status : false, message : "Please enter valid keys for updation !!!" })

    if(!isValidObjectId(bookId)) return res.status(400).send({ status : false , message : "BookId is not a valid ObjectId !!!" })

    let bookData = await bookModel.findById(bookId)

    if(!bookData) return res.status(404).send({ status : false , message : "This book is not present !!!" })

    if(bookData.isDeleted === true) return res.status(404).send({ status : false, message : "This book is already deleted !!!" })

    if(title){
        if (!isValidString(title)) return res.status(400).send({ status : false, message : "Please enter valid title !!!" })
        let titleCheck = await bookModel.findOne({ title : title })
        if (titleCheck) { return res.status(400).send({ status : false , message : "Title already exist !!!" })}}

    if(excerpt){ 
        if(!isValidString(excerpt)) return res.status(400).send({ status : false , message : "Please enter valid excerpt !!!" })
    }

    if(ISBN){
        if (!isValidString(ISBN)) return res.status(400).send({ status : false, message : "ISBN is required and should be in string !!!" })
        if (isIsbn(ISBN)) return res.status(400).send({ status : false , message : "Please enter a valid ISBN !!!" })

        let ISBNCheck = await bookModel.findOne({ ISBN : ISBN })
        if (ISBNCheck) return res.status(400).send({ status : false, message : "ISBN already exist !!!" })
    }

    if(releasedAt){
        if (!isValidString(releasedAt)) return res.status(400).send({ status : false , message : "Please enter valid released date and should be in String !!!" })

        if (isValidDate(releasedAt)) return res.status(400).send({ status : false , message : "Released Date should be in YYYY/MM/DD Format and also enter A valid date !!!" })
    }

    let updateBookData = await bookModel.findOneAndUpdate({ _id : bookId , isDeleted : false } , data , { new : true })

    res.status(201).send({ status : true , message : "Success" , data : updateBookData })

    }catch (err) {
        res.status(500).send({ status : false , error : err.message })
    } }

// ==========================delete Book=====================================

const deleteBook =async function(req , res){

    try{

    let bookId = req.params.bookId

    if(!isValidObjectId(bookId)) res.status(400).send({ status : false , message : "BookId is not a valid ObjectId !!!" })

    let bookDetails = await bookModel.findById(bookId)

    if(!bookDetails) return res.status(404).send({ status : false , message : "Book not found !!!" })

    if(bookDetails.isDeleted === true) return res.status(404).send({ status : false , message : "Book is already deleted !!!" })

    let deleteBookData = await bookModel.findOneAndUpdate({ _id : bookId } , { isDeleted : true , deletedAt : new Date() } , { new : true })

    res.status(200).send({ status : true , message : "Success" , data : deleteBookData })

    }catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

module.exports = { createBook , getAllBooks , getBookById , updatebooks , deleteBook }

