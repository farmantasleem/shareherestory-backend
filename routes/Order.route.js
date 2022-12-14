const express=require("express");
const Authentication = require("../middleware/Authentication");
const { Cartmodel } = require("../models/cartModel");
const { Ordermodel } = require("../models/orderModel");

const OrderRoute=express.Router();

//to get orders of specific users

OrderRoute.get("/",Authentication,async(req,res)=>{
    const userId=req.body.userId
    try{
        const orderdata=await Ordermodel.find({user:userId}).populate("product")
        res.status(200).send({"data":orderdata})
    }catch(err){
        res.status(404).send({"msg":err.message})
    }
})

//to create an order 

OrderRoute.post("/:productId",Authentication,async(req,res)=>{
    const userId=req.body.userId;
    const productId=req.params.productId
    
    try{
        const order_data=await new Ordermodel({user:userId,product:productId});
        await order_data.save();
        await Cartmodel.findOneAndDelete({product:productId})
        res.status(200).send({"msg":"Order Successfull"})

    }catch(err){
        res.status()
    }
})

//inserting many order

OrderRoute.post("/items",Authentication,async(req,res)=>{
    const userId=req.body.userId;
    const allproduct=req.body;
    console.log("allproduct",allproduct)
    const updated_product=allproduct.map(e=>{
        return {...e,user:userId
        }
    })
res.send(updated_product)
    try{
        await Ordermodel.insertMany([...updated_product])
        res.status(200).send({msg:"Ordered successful"})
    }
    catch(err)
    {
        res.status(500).send({"msg":err.message})
    }
})


module.exports={OrderRoute}