 const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema( {

    name:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:100,
    },
    address:String,
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required:true
    },
    isFreeAppUser:{
        type:Boolean,
        default:false,
    },
}, { timestamps: true });

module.exports = mongoose.model('userModel', userSchema)