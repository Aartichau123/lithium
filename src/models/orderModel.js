const {default:mongoose} =require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = mongoose.Schema({
    UserId:{
        type:ObjectId,
        ref:"User",
        required:[true,"Please add Your Id!"],
    },
    ProductId :{
        type: ObjectId,
        ref:"Product",
        required:[true,"Please add Product Id!"],
    },
    amount:{
        type:Number,
    },
    isFreeAppuser:Boolean,
    date:{
        type:Date,
    },
});

module.exports = mongoose.model("Oredr",orderSchema)