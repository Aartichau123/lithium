const { isValidObjectId } = require('mongoose')
const bookModel = require('../models/bookModel')
const userModel = require('../models/userModel')

const createBook = async function(req,res){

    try {

        let data = req.body
        let { title , excerpt , userId , ISBN , category , subcategory , releasedAt } = data

        if (!title) res.status(400).send({ status : false , message : "Title is required !!!" })
        if (!excerpt) res.status(400).send({ status : false , message : "Excerpt is required !!!" })
        if (!userId) res.status(400).send({ status : false , message : "UserId number is required !!!" })
        if (!ISBN) res.status(400).send({ status : false , message : "ISBN is required !!!" })
        if (!category) res.status(400).send({ status : false , message : "Category is required !!!" })
        if (!subcategory) res.status(400).send({ status : false , message : "Subcategory is required !!!" })
        if (!releasedAt) res.status(400).send({ status : false , message : "Released date is required !!!" })

        let titleCheck = await userModel.findOne(title)

        if(titleCheck) res.status(400).send({ status : false , message : "Title already in use !!!" })

        if(!isValidObjectId(userId)) res.status(400).send({ status : false , message : "UserId is not a valid ObjectId !!!" })

        let userIdCheck = await userModel.findById(userId)

        if(!userIdCheck) res.status(404).send({ status : false , message : "UserId does not exist !!!" })

        let ISBNCheck = await userModel.findOne(ISBN)

        if(ISBNCheck) res.status(400).send({ status : false , message : "ISBN already in use !!!" })

        savedData = await bookModel.create(data)

        res.status(201).send({ status : true , message : "Success" , data : savedData })

    } catch (err) {
        res.status(500).send({ status : false , message : err.message })
    }
}

module.exports = { createBook }