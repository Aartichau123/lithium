const { count } = require("console")
const productModel= require("../models/productModel")
// const userModel2= require("../models/userModel2")


const createProduct= async function (req, res) {
    let data = req.body
    // let ProductId = dataProduct.product_id
    

    let savedData= await productModel.create(data)
    res.send({msg: savedData})
}

module.exports.createProduct=createProduct