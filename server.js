const express = require('express')
const mongoose= require ('mongoose');
var jwt = require('jsonwebtoken');
const port = 5000
const app=express()


const cookieParser = require('cookie-parser')
app.use(cookieParser())

const SECEUR_JWT="ay123419"

app.get("/user/token/" , async(req,res)=>{
    try{
          const {email} = req.query;
    console.log(email);
    var token = jwt.sign({email}, SECEUR_JWT);
    res.cookie("emails",token)
    res.send(token)
    }catch(err){
           res.status(400).send("dont Fonund")
    }
  
})

app.post("/user/token/",(req,res)=>{
    let token= req.header("Authorization")
    try{
        let data = jwt.verify(token, SECEUR_JWT) 
        res.json(data)
        console.log(data);
       
    }catch(err){
        res.json({user:"Dont Found User In My Apps ",

    })
    }
}
)



async function main() {
    await mongoose.connect("mongodb+srv://elmosuy:1234@cluster0.iyuxxpr.mongodb.net/?retryWrites=true&w=majority")
}
main().then(()=>{ 
    console.log('conected db')
    app.listen(port)
})



   


  




