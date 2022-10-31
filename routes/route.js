const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createAuthor", authorController.createAuthor  )
router.post("/createpublisher", authorController.createpublisher )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )
router.post("/createBook1", authorController.createBook1  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
router.get("/getfullbookdata", authorController.getfullbookdata)
router.put("/question4", authorController.question4)
router.put("/question5", authorController.question5)

module.exports = router;