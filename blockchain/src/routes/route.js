const express = require('express');
const router = express.Router();


const coinController= require("../controllers/coinController")





router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.get("/assets",coinController.getcoins)




module.exports=router;