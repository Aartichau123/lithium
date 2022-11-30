const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const validator = require('../validations/validation.js')

const createUser = async function(req,res){

    try {

        let data = req.body
        let { title , name , phone , email , password } = data

        if(Object.keys(data).length==0) return res.status(400).send({status :false , message: "All fields are mandatory !!!"})

        if (!title || title.trim().length==0) return res.status(400).send({ status : false , message : "Title is required !!!" })
        if (!name || name.trim().length==0) return res.status(400).send({ status : false , message : "Name is required !!!" })
        if (!phone || phone.trim().length==0) return res.status(400).send({ status : false , message : "Phone number is required !!!" })
        if (!email || email.trim().length==0) return res.status(400).send({ status : false , message : "Email is required !!!" })
        if (!password || password.trim().length==0) return res.status(400).send({ status : false , message : "Password is required !!!" })

        if (!validator.isValidMobileNo(phone)) return res.status(400).send({ status: false, message: "Please provide a valid phone number its must be 10 didgit !!!" })
        let phoneCheck = await userModel.findOne({phone})
        if(phoneCheck) return res.status(400).send({ status : false , message : "Phone number already in use !!!" })

        if(!validator.isValidEmail(email)) return res.status(400).send({ status: false , message: "Please enter a valid Email id !!!" })
        let emailCheck = await userModel.findOne({email})
        if(emailCheck) return res.status(400).send({ status : false , message : "Email already in use !!!" })

        if(!validator.isValidPassword(password)) return res.status(400).send({ status: false , message: "Please enter a valid password between 8 to 15 characters !!!" })

        savedData = await userModel.create(data)

        res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

// =================================login User=================================

const userLogin = async function(req,res){

    try{
    
    const data = req.body
    const {email,password} = data

    if (Object.keys(data).length == 0) return res.status(400).send({ status : false , message : "Email and Password are mandatory !!!" })

    if(!email) return res.status(400).send({ status : false , message : "Please enter your email!!!" })
    if(!password) return res.status(400).send({ status : false , message : "Please enter your password!!!" })


    if(!validator.isValidEmail(email))  return res.status(400).send({ status : false , message : "Email Id is invalid !!!" })

    let userData = await userModel.findOne({ email , password })

    if(!userData) return res.status(404).send({status : false , message : "Email or Password is incorrect !!!"})

    let token = jwt.sign({ userId : userData._id.toString() } , "bookmanagement" , { expiresIn : "1h" })

    res.setHeader("x-api-key" , token)

    res.status(201).send({ status : true , message : "Success" , data : token })

    } catch(err){
        res.status(500).send({status : false , message : err.message})
    }
}
//delete review
var ObjectId = require('mongoose').Types.ObjectId
const deleteReview = async function (req, res){
    try{
const {bookId,reviewId}= req.params
    if (ObjectId.isValid(bookId)) {return res.status(400).send({ status: false, message: "Invalid BookId." })}

    if (ObjectId.isValid(reviewId)) {return res.status(400).send({ status: false, message: "Invalid reviewId." }) }

    let checkBook=await bookModel.findById(bookId)

    if(!checkBook){return res.status(404).send({ status: false, message: "BookId Not Found" })}
    let checkReview=await reviewModel.findById(reviewId)

    if(!checkReview){return res.status(404).send({ status: false, message: "reviewId Not Found" }) }

    if (checkBook.isDeleted == true||checkReview.isDeleted==true){return res.status(400).send({ status: false, message: "Can't Delete Review of a Deleted Book " }) }

    const deleteReviewDetails = await reviewModel.findOneAndUpdate( { _id: reviewId },{ isDeleted: true, deletedAt: new Date() },{ new: true })

    if (deleteReviewDetails) {await bookModel.findOneAndUpdate({ _id: bookId },{$inc:{ reviews: -1 }}) }
return res.status(200).send({ status: true, message: "Review deleted successfully.",data:deleteReviewDetails})
}catch(err){return res.status(500).send({ status: false, Error: err.message })}}

module.exports = { createUser , userLogin,deleteReview }