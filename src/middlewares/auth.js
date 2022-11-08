const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

    if (!token)
      return res
        .status(404)
        .send({ status: false, msg: "token must be present" });
    let decodedToken = jwt.verify(token, "functionup-lithium");
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });

    next();
  } catch (err) {
    res.status(500).send({err:err.message});
  }
};

const authorise = function (req, res, next) {
  try {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, "functionup-lithium");
    let tokenId = decodedToken.userId;
    let userId = req.params.userId;
    if (tokenId == userId) {
      next();
    } else res.status(401).send("you are not authorized");
  } catch (error) {
    res.status(500).send({error:error.message});
  }
};


const usercheck = async (req, res, next) => {
  try{
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.status(404).send({ status: false, msg: "No such user exists" });
  next();
  }catch(err){res.status(500).send({err:err.message})}
};

module.exports.authenticate = authenticate;
module.exports.authorise = authorise;
module.exports.usercheck = usercheck;