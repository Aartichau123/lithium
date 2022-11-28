const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {

    try {

    let token = req.headers["x-api-key"]

    if (!token) return res.status(400).send({ status : false, message : "Token must be present !!!" })

    jwt.verify(token, "bookmanagement", function (err, decodedToken) {
        if (err) return res.status(401).send({ status : false , message : "Token is invalid !!!" })
        req.loggedInUser = decodedToken.userId
        next()
    })

} catch (err){
    res.status(500).send({ status : false, message : err.message })
}
}

module.exports = { authentication }