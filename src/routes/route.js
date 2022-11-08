const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const Middleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",Middleware.usercheck, Middleware.authenticate,Middleware.authorise, userController.getUserData)
router.post("/users/:userId/posts", userController.postMessage)

router.put("/users/:userId",Middleware.usercheck, Middleware.authenticate,Middleware.authorise, userController.updateUser)
router.delete('/users/:userId',Middleware.usercheck, Middleware.authenticate,Middleware.authorise, userController.deleteUser)

module.exports = router;