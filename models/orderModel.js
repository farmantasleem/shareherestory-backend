const mongoose=require("mongoose");

const orderSchema=mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    product:{type:mongoose.Types.ObjectId,ref:'book',required:true}
})


const Ordermodel=mongoose.model("order",orderSchema);

module.exports={Ordermodel}