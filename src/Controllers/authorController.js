const authorModel = require("../Models/authorModel")
const jwt = require("jsonwebtoken");
const {isValidEmail,isValidString,isValidPassword} = require("../validator/validator");
// const stringvalid =/[^(A-Z)]+[a-z]+(?:(?:|['_\. ])([a-z]*(\.\D)?[a-z])+)*$/


// function stringVerify(value) {
//     if (typeof value !== "string" || value.length == 0) {
//         return false
//     }
//     return true
// }

//--------------------------createAuthor api---------------------//

const createAuthor = async function (req, res) {

    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ msg: "Please Enter details" });
        }
        let { fname, lname, title, email, password } = data;

        if (!fname) {
            return res.status(400).send({ msg: "fname is required" });
        }
        // if (fname) {
        //     if (!stringVerify(fname)) {
        //         return res.status(400).send({ msg: "fname should be type string" });
        //     }
        // }
        if (!lname) {
            return res.status(400).send({ msg: "lname is required" });
        }
        // if (lname) {
        //     if (!stringVerify(lname)) {
        //         return res.status(400).send({ msg: "lname should be type string" });
        //     }
        // }

        if(!isValidString(fname))   return res.status(400).send({ status: false, msg: "Please provide valid fname" })
        if(!isValidString(lname))   return res.status(400).send({ status: false, msg: "Please provide valid lname" })
    
        if (!title) {
            return res.status(400).send({ msg: "Title is required" });
        }

        let titles=["Mr","Mrs","Miss"]
        if(!titles.includes(title))  return res.status(400).send({status:false,msg:"Please provide the title in these options - Mr || Mrs || Miss"})
        
        // if (title) {
        //     if (!stringVerify(title)) {
        //         return res.status(400).send({ msg: "Title should be string" });
        //     } if (title != "Mr" && title != "Miss" && title != "Mrs") {
        //         return res.status(400).send({ msg: "Please write title like Mr, Mrs, Miss" });
        //     }
        // }
        if (!password) {
            return res.status(400).send({ msg: "Password is required" });
        }

        if(!isValidPassword(password))  return res.status(400).send({ status: false, msg: "Please provide valid password" })
        // const passwordFormat = /^[a-zA-Z0-9@]{6,10}$/
        // const validPassword = passwordFormat.test(password)
        // if (!validPassword) {
        //     return res.status(400).send({ status: false, msg: " Incorrect Password, It should be of 6-10 digits with atlest one special character, alphabet and number" });
        // }
        if (!email) {
            return res.status(400).send({ msg: "Email is required" })
        }
        if(!isValidEmail(email))  return res.status(400).send({status:false,msg:"invalid emailid"})
        // const isValidEmail = function (value) {
        //     let emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,3}))$/
             
        //     if (emailRegex.test(value)) return true;
        //   }

        // const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        // const validEmail = emailFormat.test(email)
        // if (!validEmail) {
        //     return res.status(400).send({ msg: "Please enter valid Email" });
        // }

        let emailinUse= await authorModel.findOne({email:email})
        if(emailinUse)   return res.status(400).send({status:false,msg:"email already in use"})

        // let uniqueEmail= await authorModel.findOne({email:email})
        // if(uniqueEmail)  return res.status(400).send({status:false,message:"email is already exist"})

        let authordata = await authorModel.create(data)
         return  res.status(201).send({ status:true , data: authordata, msg:"data created "});
    }
    catch (err) {
        res.status(500).send({ error: err.message, status: false });
    }
}


//--------------login api---------------------//

const loginAuthor = async function (req, res) {

    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            return res.status(400).send({ msg: "Email is not present" });
        }

        if (!password) {
            return res.status(400).send({ msg: "Password is not present" });
        }

        let author = await authorModel.findOne({ email: email, password: password });

        if (!author) {
            return res.status(404).send({ status: false, msg: "Email or Password is not corerct" });
        }

        let token = jwt.sign({ authorId: author._id }, "project1-room20-key")

        return res.status(200).send({ status: true, data: token });
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}



module.exports = { createAuthor, loginAuthor }