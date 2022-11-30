const { isValidObjectId } = require('mongoose')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel.js')
const { isValidString } = require('../validations/validation')

const createReview = async function (req, res) {

    try {

    let bookId = req.params.bookId;
    let data = req.body;

   let { review, reviewedBy, rating } = data;

   if (!bookId) return res.status(400).send({ status: false, message: "bookId is not present" });

    if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, message: "this is not a valid book Id" });
    

    let findBook = await book.findOne({ bookId });
    if (!findBook) return res.status(404).send({ status: false, message: "no books with this Books id" });

    if (findBook.isDeleted === true) return res.status(404).send({ status: false, message: "This book has been deleted" });
    
    if (!(rating <= 5 && rating >= 1)) return res.status(400).send({ status: false, message: "please provide a valid rating" });

    if (!validator.isValid(review)) return res.status(400).send({ status: false, message: "review is a required field" });

    if (!validator.isValid(reviewedBy)) return res.status(400).send({ status: false, message: "review is a required field" })

    data.bookId = bookId;

    let checkDetails = await reviewModel.find(data);

    if (checkDetails) return res.status(400).send({status: false,message:"a review with this details already exists, please update it",});

    let reviewCreated = await reviewModel.create(data);

    if (reviewCreated) {
    let updatedBook = await book.findOneAndUpdate({ _id: bookId },{ $inc: { reviews: 1 } },{ new: true, upsert: true });
    }

    res.status(201).send({ status: true, message: "Review published", data: updatedBook });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message});
    }
}

const updateReview = async function(req , res){

    try {
    
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId
    let data = req.body
    let { review , rating , reviewedBy } = data

    if(Object.keys(data).length == 0) return res.status(400).send({ status : false, message : "Please enter valid keys for updation!!!!" })

    if(!isValidObjectId(bookId)) return res.status(400).send({ status : false , message : "BookId is not a valid ObjectId !!!" })
    
    let bookData = await bookModel.findOne({ _id : bookId , isDeleted : false }).lean()
    if(!bookData) return res.status(404).send({ status : false , message : "This book is not present !!!" })

    // if(bookData.userId.toString() != req.loggedInUser) return res.status(403).send({ status : false, message : "You are not authorized to access this data !!!" })

    // if(bookData.isDeleted === true) return res.status(404).send({ status : false, message : "This book is already deleted !!!" })

    let reviewData = await reviewModel.findById(reviewId)

    if(!reviewData) return res.status(404).send({ status : false , message : "This review is not present !!!" })

    if(review){ 
        if(typeof review === "String" && review.trim().length == 0) return res.status(400).send({ status : false, message : "please enter valid review" })
    }

    if(rating){
        if (typeof ISBN === "String" && review.trim().length == 0) return res.status(400).send({ status : false, message : "Rating should have string datatype !!!" })
    }

    if(reviewedBy){
        if (typeof reviewedBy === "String" && reviewedBy.trim().length === 0) return res.status(400).send({ status : false, message : "Please enter valid reviewedBy and Should be in String !!!" })
    }

    let updateReviewData = await reviewModel.findOneAndUpdate({ _id : reviewId , isDeleted : false } , data , { new : true })

    if(updateReviewData){
        let reviewData = await reviewModel.find({ bookId })

        if(reviewData.length == 0) reviewData.push("No reviews available !!!")

        bookData.reviewsData = reviewData
    }

    res.status(200).send({ status : true , message : "Book list" , data : bookData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

const deleteReview = async function (req, res){

    try{

    const { bookId , reviewId } = req.params

    if (!isValidObjectId(bookId)) {return res.status(400).send({ status : false, message : "Invalid BookId !!!" })}

    if (!isValidObjectId(reviewId)) {return res.status(400).send({ status : false, message : "Invalid reviewId !!!" }) }

    let checkBook = await bookModel.findById(bookId)
    if(!checkBook) return res.status(404).send({ status : false, message : "Book not found !!!" })

    let checkReview=await reviewModel.findById(reviewId)

    if(!checkReview)return res.status(404).send({ status : false, message : "Review not found !!!" })

    if (checkBook.isDeleted === true || checkReview.isDeleted === true) return res.status(400).send({ status : false, message : "Can't delete review of a deleted book !!!" })

    const deleteReviewDetails = await reviewModel.findOneAndUpdate( { _id : reviewId } , { isDeleted : true, deletedAt : new Date() } , { new : true })

    if (deleteReviewDetails) {
        await bookModel.findOneAndUpdate({ _id: bookId } , { $inc : { reviews: -1 } }) 
    }

    res.status(200).send({ status : true, message : "Success" , data : deleteReviewDetails })

    } catch(err){
        res.status(500).send({ status : false, message : err.message })
    }
}

module.exports = { createReview , updateReview , deleteReview }