const express = require('express');
//const myHelper = require('../util/helper')
//const underscore = require('underscore')

const router = express.Router();

let players=[{
    "name": "manish",
    "dob": "1/1/1995",
    "gender": "male",
    "city": "jalandhar",
    "sports": [
    "swimming"
    ]
    },
    {
        "name": "gopal",
        "dob": "1/09/1995",
        "gender": "male",
        "city": "delhi",
        "sports": [
            "soccer"
        ]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": [
            "soccer"
        ]
    },
]
   
// players problems

router.post('/players', function (req, res) {
    let newPlayer = req.body
    let newPlayersName = newPlayer.name
    let isNameRepeated = false

    //let player = players.find(p => p.name == newPlayersName)

    for(let i = 0; i < players.length; i++) {
        if(players[i].name == newPlayersName) {
            isNameRepeated = true;
            break;
        }
    }

    //undefined is same as false/ a falsy value
    if (isNameRepeated) {
        //Player exists
        res.send("This player was already added!")
    } else {
        //New entry
        players.push(newPlayer)
        res.send(players)
    }

    })

//consecative number problem 1

// router.get('/sol1', function (req, res) {
//     let arr=[1,2,3,5,6,7];
//     let n=(arr[arr.length-1])
//     let arrsum=arr.reduce((x,total)=>total =total+x);
//     let sum= n * (n+1) / 2
//     let missingnumber =sum-arrsum
//     console.log(missingnumber)
//     res.send({data:missingnumber})
// })

//consecative number problems 2

// router.get('/sol2', function (req, res) {
//     let arr=[33,34,35,37,38];
//     let missingNumber=0;
//     for (let i=0;i<arr.length;i++){
//         if(arr[i]+1!==arr[i+1]){  //a[0]+1 !=a[1]
//             missingNumber=arr[i]+1;
//             break;
//         }
//     }
//     console.log(missingNumber)
//     res.send({data:missingNumber})
// })


// 



module.exports = router;

// adding this comment for no reasonnpx
