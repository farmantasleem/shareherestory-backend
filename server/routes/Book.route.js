const express=require("express");
const Bookmodel=require("../models/bookModel")
const mongoose=require("mongoose")
const BookRoute=express.Router();
BookRoute.use(express.json())

//to Get all the books

BookRoute.get("/get",async(req,res)=>{
    const books=await Bookmodel.find();
    res.status(200).json(books)
})


//to Create new book

BookRoute.post("/book/add",async(req,res)=>{
    try{
        const newBook=await new Bookmodel({...req.body}) //creating new book
        await newBook.save();           //saving data to database
        res.status(200).send(newBook)  //sending succesfull response
    }catch(err){
        res.status(404).send(err)  //if error sending error
    }
})

module.exports={BookRoute}  //exporting


