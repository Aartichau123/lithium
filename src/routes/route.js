const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    console.log("The path params in the request are : ", req.params)
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})


// Example 1 for path params
// router.get('/students/:studentName', function(req, res){
//     // ':' denotes that the following part of route is a variable
//     // The value of this variable is what we are sending in the request url after /students
//     // This value is set in the form of an object inside req.params
//     // The object contain key value pairs
//     // key is the variable in the route
//     // value is whatever dynamic value sent in the request url
//     let myParams = req.params

//     // params attribute is fixed in a request object
//     // params contains the path parameters object
//     console.log("The path params in the request are : ", myParams)
//     res.send('The full name is ' + myParams.studentName )
// })

// Example 2 for path params

router.get('/student-details/:name', function(req, res){
    let requestParams = req.params
    console.log("This is the request ", requestParams)
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    res.send('Dummy response')
})

//First program

router.get('/movies',function(req,res){
const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins'];
res.send(movies);
});

//second program

// router.get('/movies/:indexNumber',function(req,res){
//     const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins'];
//     const art=req.params; //{indexnumber :0/1/2/3}
//     const chauhan=Number(art.indexNumber); //here convert string into numbers using Number.
//     //when we use art.indexNumber then print '1'.
//     res.send(movies[chauhan]);
//     });

//third program

// router.get('/movies/:indexNumer',function(req,res){
//     const movies=['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins'];
//     const art=req.params; 
//     const chauhan=Number(art.indexNumer); 
  
//     if (chauhan > movies.length-1){
//         res.send('use a valid index')
//     }else{
//         res.send(movies[chauhan])
//     }
    
//    });


//Fourth program

router.get('/films',function(req,res){
    const movies=[
        {
           id:1 ,
           name:'Rang de basanti'
        },

        {
            id:2 ,
            name:'The shining'
        },
        {   
            id:3 ,
            name:'Lord of the rings'
        },
        {
            id:4 ,
            name:'Batman begins'
        } ]

    res.send(movies);
    });



//Fifth program


router.get('/films/:filmId',function(req,res){
    const movies=[
        {
           id:1 ,
           name:'Rang de basanti'
        },

        {
            id:2 ,
            name:'The shining'
        },
        {   
            id:3 ,
            name:'Lord of the rings'
        },
        {
            id:4 ,
            name:'Batman begins'
        } ]
    const filmobj=req.params;
    const filmId=Number(filmobj.filmId)-1;

    if(filmId>movies.length-1){
        res.send("No movies exists with this id")
    }else{
        res.send(movies[filmId].name)
    }

    });

module.exports = router;