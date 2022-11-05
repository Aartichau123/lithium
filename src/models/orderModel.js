const mongoose =require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = mongoose.Schema({
    UserId:{
        type:ObjectId,
        ref:"User",
        required:true,
    },
    ProductId :{
        type: ObjectId,
        ref:"Product",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
    },
},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema)