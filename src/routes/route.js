const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")

const Auth = require("../auth/auth") 

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",Auth.Idcheck,Auth.tokencheck, userController.getUserData)

router.put("/users/:userId",Auth.Idcheck,Auth.tokencheck, userController.updateUser)

router.delete("/deletData/:userId",Auth.Idcheck,Auth.tokencheck,userController.deletData)

module.exports = router;