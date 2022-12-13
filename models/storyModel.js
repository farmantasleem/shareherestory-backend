const mongoose = require("mongoose");

const storySchema=mongoose.Schema({
    title:{required:true,type:String,unique:true},
    description:{type:String,required:true},
    author:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    content:{type:String,required:true},
    img:{type:String,required:true},
    comments:{type:Array,default:[]},
    views:{type:Number,default:0},
    likes:{type:Number,default:0},
    category:{type:String,default:"other"},
    date: {
        type: Date,
        default: new Date()
    }

})

const Storymodel=mongoose.model("story",storySchema)
module.exports=Storymodel