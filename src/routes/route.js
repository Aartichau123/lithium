const express = require('express');
const router = express.Router();
const UserController= require("../controllers/user2Controller")
const BookController= require("../controllers/bookController")
// const commonMW = require ("../middlewares/commonMiddlewares")
const commonMW = require ("../middlewares/myMiddleware")

// router.get("/test-me", function (req, res) {
//     res.send("My first ever api!")
// })

//Can we set the 'next' input parameter in a route handler?
//What is the primary difference between a middleware and a route handler?
// router.post("/createBook", commonMW.myMiddleware,BookController.createBook, function(req, res, next){
//     res.send("Ending the cycle")
// }  )

// router.post("/createUser", commonMW.myMiddleware, UserController.createUser)
// router.post("/createProduct", commonMW.myMiddleware, UserController.createProduct)
// router.post("/createOrder", commonMW.myMiddleware, UserController.createOrder)

// router.get("/dummy1", commonMW.myOtherMiddleware, UserController.dummyOne)

// router.get("/dummy2", commonMW.myOtherMiddleware, UserController.dummyTwo)

// router.get("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.mid4, UserController.basicCode)


//--------------my asignment--
const productController= require("../controllers/productController")
const orderController= require("../controllers/orderController")
const user2Controller= require("../controllers/user2Controller")

 router.post("/createProduct", productController.createProduct)
 router.post("/createUseer",commonMW.mid1, user2Controller.createUseer)
 router.post("/createOrder",commonMW.mid1, orderController.createOrder)

module.exports = router;