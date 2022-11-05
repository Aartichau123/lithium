const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken");
const Idcheck = async function(req,res,next){
    let userId = req.params.userId
    let userdata = await userModel.find({_id:userId})
    if(!userId){
        return res.send({status:false,msg:"UserId must be present"})
    }else if (userdata.length==0){
        return res.send({status:false,msg:"This userId is not is the database"})
    }
    next()
}

const tokencheck = async function(req,res,next){
    try{
    let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });
  let decodedToken = jwt.verify(token, "functionup-Lithium-very-very-secret-key");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
next()
    }catch(e){
        res.send(e)
    }
}

module.exports.Idcheck = Idcheck
module.exports.tokencheck=tokencheck