const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
try{
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = req.body;
  let savedData = await userModel.create(data);
  // console.log(req.newAtribute);
  res.status(201).send({ msg: savedData });
}catch(error){res.status(500).send({error:error.message})}
}


const loginUser = async function (req, res) {
  try{
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.status(404).send({
      status: false,
      msg: "username or the password is not correct",
    });

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "lithium",
      organisation: "FUnctionUp",
    },
    "functionup-lithium"
  );
  res.setHeader("x-auth-token", token);
  res.status(201).send({ status: true, data: token });
  }catch(err){res.status(500).send({err:err.message})}
};


const getUserData = async function (req, res) {
   try{
   let userId = req.params.userId;
    let userDetails = await userModel.findById(userId);
  res.status(200).send({ status: true, data: userDetails });  
  }catch(err){
    res.status(500).send({err:err.message})
  }
};

const updateUser = async function (req, res) {
try{
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true});
  res.status(201).send({ status: updatedUser, data: updatedUser });
}catch(e){
  res.status(500).send({e:e.message})
}
};



const deleteUser =async (req,res)=>{
  try{
  let userId = req.params.userId;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId },{isDeleted:true},{new:true});
  res.status(201).send({status:true,data:updatedUser})
  }catch(error){
    res.status(500).send({error:error.message})
  }
}

const postMessage = async function (req, res) {
  try{
    let message = req.body.message
    // Check if the token is present
    // Check if the token present is a valid token
    // Return a different error message in both these cases
    let token = req.headers["x-auth-token"]
    if(!token) return res.send({status: false, msg: "token must be present in the request header"})
    let decodedToken = jwt.verify(token, 'functionup-lithium')

    if(!decodedToken) return res.status(500).send({status: false, msg:"token is not valid"})
    
    //userId for which the request is made. In this case message to be posted.
    let userToBeModified = req.params.userId
    //userId for the logged-in user
    let userLoggedIn = decodedToken.userId

    //userId comparision to check if the logged-in user is requesting for their own data
    if(userToBeModified != userLoggedIn) return res.send({status: false, msg: 'User logged is not allowed to modify the requested users data'})

    let user = await userModel.findById(req.params.userId)
    if(!user) return res.status(404).send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.status(201).send({status: true, data: updatedUser})
  }catch(err){
    res.status(500).send({err:err.message})
  }
  }

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.postMessage = postMessage
module.exports.deleteUser=deleteUser