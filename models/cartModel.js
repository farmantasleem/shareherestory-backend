const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    product:{type:mongoose.Types.ObjectId, required:true, ref:'book'},
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true}
})

const Cartmodel=mongoose.model("cart",cartSchema);

module.exports={Cartmodel}