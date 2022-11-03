// USER MODEL IMPORTED
const User = require(".../models/userModel2");

//CREATE USER CONTROLLER FUNCTION
exports.createUser =async function (req,res){
    try{
        //THIS IS A NEW USER SO ADDING ONE FREE PURCHASE IN THIS PROFILE

        req.body.isFreeAppUser =true;

        //CREATE USER IN DATA BASE

        const userData = await User.create(req.body);

        //SENDING STATUS OF SUCCESS
        res.status(200).json({
            status:"success",
            message:"Congratulation! ${userData.name} Your Account is Created .",
            Bonus:"Your first Purchase is absolutly free...",
            User:userData,
        });
    }catch(error){
        res.status(404).json({
            status:"fail",
            message:{
                error,
            },
        });
    }
};
module.exports.createUser= createUser