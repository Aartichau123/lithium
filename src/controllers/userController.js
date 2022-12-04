const jwt = require("jsonwebtoken")
const userModel = require('../models/userModel')
const { isValidString , isValidMobileNo , isValidEmail , isValidPassword } = require('../validations/validation.js')

const createUser = async function(req,res){

    try {

        let data = req.body
        let { title , name , phone , email , password } = data

        if(Object.keys(data).length==0) return res.status(400).send({status : false , message : "All fields are mandatory !!!"})

        if (!title || !isValidString(title)) return res.status(400).send({ status : false , message : "Title is required !!!" })
        if(!(["Mr","Mrs","Miss"].includes(title))) return res.status(400).send({status : false , message : "You can use only Mr , Mrs and Miss as title !!!"})

        if (!name || !isValidString(name)) return res.status(400).send({ status : false , message : "Name is required !!!" })
        if(!isValidString(name)) return res.status(400).send({ status : false , message : "Name is required !!!" })

        if (!phone || !isValidString(phone)) return res.status(400).send({ status : false , message : "Phone number is required !!!" })
        if (!isValidMobileNo(phone)) return res.status(400).send({ status: false, message: "Please provide a valid phone number of 10 digits !!!" })
        let phoneCheck = await userModel.findOne({phone})
        if(phoneCheck) return res.status(400).send({ status : false , message : "Phone number already in use !!!" })

        if (!email || !isValidString(email)) return res.status(400).send({ status : false , message : "Email is required !!!" })
        if(!isValidEmail(email)) return res.status(400).send({ status: false , message: "Please enter a valid Email id !!!" })
        let emailCheck = await userModel.findOne({email})
        if(emailCheck) return res.status(400).send({ status : false , message : "Email already in use !!!" })

        if (!password || !isValidString(password)) return res.status(400).send({ status : false , message : "Password is required !!!" })
        if(!isValidPassword(password)) return res.status(400).send({ status: false , message: "Please enter a valid password between 8 to 15 characters !!!" })

        let savedData = await userModel.create(data)

        res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

// =================================login User=================================

const userLogin = async function(req,res){

    try{
    
    const data = req.body
    const { email , password } = data

    if (Object.keys(data).length == 0) return res.status(400).send({ status : false , message : "Email and Password are mandatory !!!" })

    if(!email || !isValidString(email)) return res.status(400).send({ status : false , message : "Please enter your email !!!" })
    if(!password || !isValidString(password)) return res.status(400).send({ status : false , message : "Please enter your password !!!" })

    let userData = await userModel.findOne({ email , password })
    if(!userData) return res.status(404).send({ status : false , message : "Email and password is incorrect !!!" })
    

    let token = jwt.sign({ userId : userData._id.toString() } , "bookmanagement" , { expiresIn : "24h" })

    res.setHeader("x-api-key" , token)

    res.status(201).send({ status : true , message : "Success" , data : token })

    } catch(err){
        res.status(500).send({status : false , message : err.message})
    }
}

module.exports = { createUser , userLogin }