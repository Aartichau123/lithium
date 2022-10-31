const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    bookName: String,
    author: {
        type: ObjectId,
        ref: "AuthorOne"
    }, 
    price: Number,
    
    publishername:{
        type: ObjectId,
        ref: "Publisher"
    }

}, { timestamps: true });


module.exports = mongoose.model('BookOne', bookSchema)
