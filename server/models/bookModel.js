const mongoose=require("mongoose");

const bookSchema=mongoose.Schema({
    title:{required:true,type:String,unique:true},
    author:{type:String,required:true},
    description:{type:String,required:true},
    cost:{type:Number,required:true},
    stock:{type:Number,default:0},
    category:{type:String,default:"any"},
    img:{type:String,required:true}
})

const Bookmodel=mongoose.model("book",bookSchema);

module.exports=Bookmodel