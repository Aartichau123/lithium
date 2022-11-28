const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const validator = require('../validations/validation.js')

const createUser = async function(req,res){

    try {

        let data = req.body
        let { title , name , phone , email , password } = data

        if(Object.keys(data).length==0) return res.status(400).send({status :false , message: "All fields are mandatory !!!"})

        if (!title || title.trim().length==0) res.status(400).send({ status : false , message : "Title is required !!!" })
        if (!name || name.trim().length==0) res.status(400).send({ status : false , message : "Name is required !!!" })
        if (!phone || phone.trim().length==0) res.status(400).send({ status : false , message : "Phone number is required !!!" })
        if (!email || email.trim().length==0) res.status(400).send({ status : false , message : "Email is required !!!" })
        if (!password || password.trim().length==0) res.status(400).send({ status : false , message : "Password is required !!!" })

        if (!validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Please provide a valid phone number !!!" })
        let phoneCheck = await userModel.findOne(phone)
        if(phoneCheck) res.status(400).send({ status : false , message : "Phone number already in use !!!" })

        if(!validator.isValidpassword(password)) return res.status(400).send({ status: false , message: "Please enter a valid password between 8 to 15 characters !!!" })
        let emailCheck = await userModel.findOne(email)
        if(emailCheck) res.status(400).send({ status : false , message : "Email already in use !!!" })

        savedData = await userModel.create(data)

        res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

const userLogin = async function(req,res){

    try{
    
    const data = req.body
    const {email,password} = data

    if (Object.keys(data).length == 0) {return res.status(400).send({ status : false , message : "Email and Password are mandatory !!!" });}

    if(!email || !password) return res.status(400).send({ status : false , message : "Please enter your email and Password !!!" })

    let validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if(!validEmail.test(email))  return res.status(400).send({ status : false , message : "Email Id is invalid !!!" })

    let userData = await userModel.findOne({ email : email , password : password })

    if(!userData) return res.status(404).send({status : false , message : "Email or Password is incorrect !!!"})

    let token = jwt.sign({ userId: userData._id.toString() } , "bookmanagement" , { expiresIn : "1h" })

    res.setHeader("x-api-key" , token)

    res.status(200).send({ status : true , message : "Success" , data : token })

    } catch(err){
        res.status(500).send({status : false , message : err.message})
    }
}

module.exports = { createUser , userLogin }