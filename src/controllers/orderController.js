const {isValidObject} = require("mongoose")
const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createOrder= async function (req, res) {
    let {productId,userId}= req.body
    // let isFreeAppUser=req.isFreeAppUser

    //required field validation

    if(!productId || !userId){
        return res.send({message:"productId and userId is mandatory"})
    }

    //objectId validation -productid

    if(!isValidObject(productId)){
        return res.send({message:"productId is not a valid ObjectId"})
    }

    //objectId validation -userid

    if(!isValidObject(userId)){
        return res.send({message:"userId is not a valid ObjectId"})
    }

    const userDetails=await userModel.findById(userId)

    //valid user validation

    if(!userDetails){
        return res.send({message:"user is not present"})
    }

    const productDetails=await productModel.findById(productId)

    //valid user validation

    if(!productDetails){
        return res.send({message:"product is not present"})
    }


     if(isFreeAppUser){
        const order= await orderModel.create({
            userId:userId,
            productId:productId,
            amount:0,
            isFreeAppUser:isFreeAppUser, //header value
            date:new Date()

        })
        return res.send({data:order})
    }
    else{
        if(userDetails.user < productDetails.price){
            return res.send({message: "you don't have sufficent balance"})}
        }

        const orderDetails={
            userId:userId,
            productId:productId,
            amount:0,
            isFreeAppUser:isFreeAppUser, //header value
            date:new Date()

        }

        const order= await orderModel.create(orderDetails)

        const user=await userModel.findByIdAndUpdate(userId,{$inc:{balance: -productDetails.price}})

        return res.send({data:order})
    }


module.exports.createOrder = createOrder