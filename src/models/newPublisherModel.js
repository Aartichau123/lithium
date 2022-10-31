const mongoose = require('mongoose');

const newPublisherSchema = new mongoose.Schema( {
    publisher_id: String,
    publisher_name: String,
    age:Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('Publisher', newPublisherSchema)
