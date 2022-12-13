const express=require("express");
const Storymodel=require("../models/storyModel")
const StoryRoute=express.Router();
StoryRoute.use(express.json())
const mongoose=require("mongoose")
const Authentication=require("../middleware/Authentication")


//get document count

StoryRoute.get("/all",async(req,res)=>{
    const resp=await Storymodel.countDocuments();
    res.send({"Data":resp})
})

//to get books based on Query Most query ? most viewed/recent

StoryRoute.get("/",async(req,res)=>{
    const {result}=req.query;
    const page=req.query.page
    const skippage=(page*3)-3
    if(result=="mostviewed"){
    const data=await Storymodel.find().limit(3).skip(skippage).sort({views:-1}).populate("author");
    res.status(200).json(data)
    }else{
        const allstory=await Storymodel.find().limit(3).skip(skippage).populate("author");
        res.status(200).json(allstory)
    }
    
})

StoryRoute.get("/mystories",Authentication,async(req,res)=>{
    const userId=req.body.userId;

    try{
        const allstory=await Storymodel.find({author:userId}).populate("author")
        res.status(200).send(allstory)

    }catch(err){
        res.status(404).send({"msg":err.message})
    }
})

//to get all the story

StoryRoute.get("/get",async(req,res)=>{
    const page_no=req.query.page
    const allstory=await Storymodel.find().limit(3).skip(0)
    res.status(200).json(allstory)
})

//to get only one story based on based 

StoryRoute.get("/:title",async(req,res)=>{
    let title=req.params.title;
    title=title.split("_").join(" ")
    const data=await Storymodel.find({title:title}).populate("author");
    const numberof=+data[0].views
    const viewss=numberof+1
    const find_update=await Storymodel.findOneAndUpdate({title:title},{...data,views:viewss})
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({err:"Not Found"})
    }
})

//to create a new story

StoryRoute.post("/add",Authentication,async(req,res)=>{
    try{
        const userId=req.body.userId
        console.log(userId)
        const newStory=await new Storymodel({...req.body,author:userId})
        await newStory.save()
        console.log(newStory)
        res.status(200).send(newStory)
        
    }catch(err){
        res.status(404).send(err)
    }
})

StoryRoute.delete("/:id",Authentication,async(req,res)=>{
    const storyid=req.params.id
    try{
        await Storymodel.findOneAndDelete({_id:storyid})
        res.status(200).send({"msg":"Story Deleted"})
    }catch(err){
        res.status(400).send({msg:err.message})
    }
})

module.exports={StoryRoute}