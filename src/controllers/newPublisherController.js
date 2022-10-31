const NewPublisherModel= require("../models/newPublisherModel")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await NewPublisherModel.create(publisher)
    res.send({data: publisherCreated})
}

// const getAuthorsData= async function (req, res) {
//     let authors = await AuthorModel.find()
//     res.send({data: authors})
// }

module.exports.createPublisher= createPublisher

// module.exports.getAuthorsData= getAuthorsData