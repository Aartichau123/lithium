const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

// router.post("/createBook",async function (req, res) {
    
//     let data=req.body
//     let savedData= await bookModel.find(data)
//     Bookmodel.create(data)
//     res.send({msg: savedData})
// })

//  router.post("/createUser", UserController.createUser  )

//  router.get("/getUsersData", UserController.getUsersData)

router.post("/createBook", BookController.createBook)

router.get("/getBooksData", BookController.getBooksData)

module.exports = router;