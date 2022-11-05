const productModel= require("../models/productModel")
// const userModel2= require("../models/userModel2")


const createProduct= async function (req, res) {
 const {name ,catogory,price} = req.body

 //required field validation

 if(!name || !catogory || !price){
    return res.send("all field name , category and price are mandotory field")
 }
 let productDetails=await productModel.create({name ,catogory,price})
 res.send({data:productDetails})

}

module.exports.createProduct=createProduct