const { isValidObjectId } = require('mongoose')
const moment = require('moment')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel=require('../models/reviewModel.js')
const { isValidString } = require('../validations/validation')

const createBook = async function(req,res){

    try {

        let data = req.body
        let { title , excerpt , userId , ISBN , category , subcategory , releasedAt } = data

        if (!title ||title.trim().length==0) return res.status(400).send({ status : false , message : "Title is required !!!" })
        if (!excerpt||excerpt.trim().length==0) return res.status(400).send({ status : false , message : "Excerpt is required !!!" })
        if (!userId||userId.trim().length==0) return res.status(400).send({ status : false , message : "UserId number is required !!!" })
        if (!ISBN||ISBN.trim().length==0) return res.status(400).send({ status : false , message : "ISBN is required !!!" })
        if (!category ||category.trim().length==0) return res.status(400).send({ status : false , message : "Category is required !!!" })
        if (!subcategory||subcategory.trim().length==0) return res.status(400).send({ status : false , message : "Subcategory is required !!!" })
        if (!releasedAt||releasedAt.trim().length==0) return res.status(400).send({ status : false , message : "Released date is required !!!" })

        let titleCheck = await bookModel.findOne({title})
        if(titleCheck) return res.status(400).send({ status : false , message : "Title already in use !!!" })

        if(!isValidObjectId(userId)) res.status(400).send({ status : false , message : "UserId is not a valid ObjectId !!!" })
        let userIdCheck = await userModel.findById(userId)
        if(!userIdCheck) return res.status(404).send({ status : false , message : "UserId does not exist !!!" })


        let ISBNCheck = await bookModel.findOne({ISBN})
        if(ISBNCheck) return res.status(400).send({ status : false , message : "ISBN already in use !!!" })
        data.releasedAt = moment(data.releasedAt).format('YYYY-MM-DD')

        savedData = await bookModel.create(data)

        res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}


// ===============================getUsers==========================

const getAllBooks = async function (req, res) {

    try {

    let filter = req.query
    let { category , userId , subcategory } = filter

    if(category){
        if(!isValidString(category)) return res.status(400).send({ status : false , message : "Category is required !!!" })
    }

    if(userId){
        if(!isValidObjectId(userId)) res.status(400).send({ status : false , message : "UserId is not a valid ObjectId !!!" })
        let userIdCheck = await userModel.findById(userId)
        if (!userIdCheck) { return res.status(404).send({ status : false, message : "UserId does not exist." }) }
    }

    if(subcategory){
        if(!isValidString(category)) return res.status(400).send({ status : false , message : "Category is required !!!" })
    }

    filter.isDeleted = false

    let bookDetails = await bookModel.find(filter).select({ title : 1 , excerpt : 1 , userId : 1 , category : 1 , reviews : 1 , releasedAt : 1 }).sort({ title : 1 })

    if (bookDetails.length == 0) return res.status(404).send({ status : false, message : "No books available." })

    res.status(200).send({ status : true , message : "Book list" , data : bookDetails })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}


// =========================get Book Bt Id=========================================================

const getBookById = async function(req,res){

    try {

        let bookId = req.params.bookId

        if(!isValidObjectId(bookId)) res.status(400).send({ status : false , message : "BookId is not a valid ObjectId !!!" })

        let bookData = await bookModel.findById(bookId).select({ISBN:0,__v:0});
        if (!bookData) return res.status(404).send({ status : false, message : "BookId does not exist." })

        let reviewData = await reviewModel.find({ bookId })

        if(reviewData.length == 0) reviewData.push("No reviews available !!!")
        console.log(reviewData)
        // bookData["reviewsData"]=reviewData;
        Object.assign(bookData,{reviewsData:reviewData})
        console.log(bookData)

        res.status(200).send({ status : true , message : "Book list" , data : bookData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

module.exports = { createBook , getAllBooks , getBookById }

