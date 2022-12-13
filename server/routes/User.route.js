const express=require("express");
const Usermodel=require("../models/userModel")
// const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const UserRoute=express.Router();
UserRoute.use(express.json())
const jwt=require("jsonwebtoken")


// to login 
UserRoute.post("/login",async(req,res)=>{
    if(req.body&&req.body.email&&req.body.password){
        const {email,password} =req.body; // getting email and password sent by client

        try{
            const user_data=await Usermodel.findOne({email:email})  //getting data from database for email
            const isMatch=await bcrypt.compare(password,user_data.password)  //comparing password with db password
            if(isMatch){
                const token = jwt.sign({"id":user_data._id }, process.env.JWT,{
                    expiresIn: '336h'
                });

                res.status(200).send({"msg":"Login Successfull","token":token})  //if password is same
            }else{
                res.status(404).send({"msg":"Invalid Credientials"})  //else 
            }
        }catch(e){
            res.status(404).send({"msg":"Invalid Credientials"})
        }
    }else{
        res.status(404).send({"msg":"No data Found"})
    }
})
// To create a new user

UserRoute.post("/signup",async(req,res)=>{
  
    try{
       const newUser= await new Usermodel({...req.body});  //creating new user
       console.log(newUser)
      
       await newUser.save()   //saving data to database
       res.send(newUser)
    }catch(err){
           res.status(404).send(err.message)  //if error sending error with 404 staus
    }
   })
   

module.exports={UserRoute}  //to export this route[,/h]

