const express=require("express");
const Authentication = require("../middleware/Authentication");
const { Cartmodel } = require("../models/cartModel");

const CartRoute=express.Router();

//to get cart item of  specific user

CartRoute.get("/",Authentication,async(req,res)=>{
    const userId=req.body.userId
    try{
        const cart_data=await Cartmodel.find({user:userId}).populate("product").populate("user")
        res.status(200).send({"data":cart_data})
    }catch(err){
        res.status(404).send({"msg":err.message})
    }

})

//add something to cart

CartRoute.post("/:productId",Authentication,async(req,res)=>{
    const userId=req.body.userId
    const product=req.params.productId;
    if(product){
        try{
            const cartitem=await Cartmodel({product:product,user:userId})
            await cartitem.save();
            res.status(200).send({"msg":"Added to cart Successfully"})
        }catch(err){
            res.status(404).send({"msg":err.message})
        }
    }else{
        res.status(404).send({"msg":"No Item found"})
    }



})

//delete item of the cart
CartRoute.delete("/:bookid",Authentication,async(req,res)=>{
    const bookid=req.params.bookid;
    const userid=req.body.userId;
    console.log(userid,bookid)
    try{
        await Cartmodel.findOneAndDelete({_id:bookid,user:userid})
        res.status(200).send({"msg":"Deleted successfully"})
    }catch(err){
        res.status(404).send({msg:err.message})
    }
})

module.exports={CartRoute}