let axios = require("axios")
const coinModel=require("../models/coinModel")

const getcoins = async function (req, res) {
    try {
        let key =req.headers.Authorization
        let options = {
            method: "get",
            url: "https://api.coincap.io/v2/assets" ,
            headers: {
                Authorization: `${key}`,
              }
            
            }
        let result = await axios(options);
        let data= result.data.data;
        let sortArr = data.sort((a,b)=>a.changePercent24Hr - b.changePercent24Hr)

        await coinModel.insertMany(sortArr)
        sortArr.forEach(x => {
            delete x.explorer
            
        })
        return res.status(201).send({data:sortArr})

       
    } catch (err) {
        if(err.code == 11000){
            return res.status(400).send({status:false,message:"Repetition of data or Duplication value provieded"})
        }
        res.status(500).send(err.message);
    }
};




module.exports={getcoins}