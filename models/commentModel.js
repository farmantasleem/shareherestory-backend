const mongoose=require("mongoose");

const commentSchema=mongoose.Schema({
    comment:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    story:{type:mongoose.Types.ObjectId,ref:'story',required:true}
})

const Commentmodel=mongoose.model("comment",commentSchema)

module.exports={Commentmodel}