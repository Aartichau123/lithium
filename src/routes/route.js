const express = require('express');
//const myHelper = require('../util/helper')
//const underscore = require('underscore')

const router = express.Router();
//consecative number problem
// router.get('/sol1', function (req, res) {
//     let arr=[1,2,3,5,6,7];
//     let n=(arr[arr.length-1])
//     let arrsum=arr.reduce((x,total)=>total =total+x);
//     let sum= n * (n+1) / 2
//     let missingnumber =sum-arrsum
//     console.log(missingnumber)
//     res.send({data:missingnumber})
// })

//non-consecative number problems
// router.get('/sol2', function (req, res) {
//     let arr=[33,34,35,37,38];
//     sumofArray = 0
//     let first=[0]
//     let last=(arr[arr.length-1])
//     for (let i=0;i<arr.length;i++){
//         sumofArray+=arr[i]
//     }
//     let n=arr.length+1
//     let realsum=[n*(first+last)/2]
//     let missingNumber =realsum-sumofArray
//     console.log(sumofArray)
//     console.log(realsum)
//     console.log(last)
//     console.log(missingNumber)
//     res.send({data:missingNumber})
// })

router.get('/sol2', function (req, res) {
    let arr=[33,34,35,37,38];
    let missingNumber=0;
    for (let i=0;i<arr.length;i++){
        if(arr[i]+1!==arr[i+1]){
            missingNumber=arr[i]+1;
            break;
        }
    }
    console.log(missingNumber)
    res.send({data:missingNumber})
});
module.exports = router;
// adding this comment for no reason