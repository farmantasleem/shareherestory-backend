const express=require("express");
const { Commentmodel } = require("../models/commentModel");

const CommentRoute=express.Router();
const Authentication=require("../middleware/Authentication")


//get all comments for story

CommentRoute.get("/:storyId",async(req,res)=>{
        const storyId=req.params.storyId;
        try{
            const commentdata=await Commentmodel.find({story:storyId}).populate("user")
            res.status(200).send(commentdata)

        }catch(err){
            res.status(404).send({"msg":err.message})
        }

})

//add comment for story

CommentRoute.post("/:storyId",Authentication,async(req,res)=>{
    const storyId=req.params.storyId;
    const comment=req.body.comment;
    const userId=req.body.userId
    if(!comment){res.status(404).send({"msg":"No Comment found"})}else{
    try{
        const create_comment=await Commentmodel({comment,story:storyId,user:userId})
        await create_comment.save()
        res.status(200).send({"msg":"Comment added"})
    }catch(err){
            res.status(400).send({"msg":err.message})
    }}
})


module.exports={CommentRoute}