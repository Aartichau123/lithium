const bookModel=require("../models/bookModel")


//Create Book in DB

const createBook= async function (req, res) {
    let data=req.body
    let savedData= await bookModel.find(data)
    res.send({msg: savedData})
}


//Fetch book data from DB

const getBooksData= async function (req, res) {
    let allBooks= await bookModel.find()
    res.send({msg: allBooks})
}

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData