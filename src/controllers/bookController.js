const BookModel= require("../models/bookModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
};

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find( )
    res.send({msg: allBooks})
};

const bookList= async function (req, res) {
    let allBookNameAuthor= await BookModel.find().select(  { bookName : 1 , authorName:1,_id:0 }  );
    res.send({msg: allBookNameAuthor});
};

const getBooksInYear= async function (req, res) {
    const year=req.params.year;
    let year1= await BookModel.find(  { year }  );
    res.send({msg: year1});
};

const getParticularBooks= async function (req, res) {
    let allBook= await BookModel.find(  { bookName:/^hi/i}  );
    res.send({msg: allBook});
};

const getXINRBooks= async function (req, res) {
    let INDPrice= await BookModel.find(  { $or:[{indianPrice:"100INR"},{indianPrice:"200INR"},{indianPrice:"500"}] }   );
    res.send({msg: INDPrice});
};

const getRandomBooks= async function (req, res) {
    let GT500 = await BookModel.find(  { totalPages : {$gt:500 } } );
    res.send({msg: GT500});
};

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.bookList= bookList
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks= getXINRBooks
module.exports.getRandomBooks= getRandomBooks