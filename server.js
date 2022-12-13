const express=require("express");
const {StoryRoute} =require("./routes/Story.route")
const {BookRoute} =require("./routes/Book.route")
const {UserRoute}=require("./routes/User.route")
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"})
const PORT=process.env.PORT;
const Database=require("./config/database.js");
const { CartRoute } = require("./routes/Cart.route");
const { OrderRoute } = require("./routes/Order.route");
const { CommentRoute } = require("./routes/Comment.route");
const app=express();


app.use(cors())   //to avoid cors error
app.use(express.json())   //to receive data in json Format



app.use("/story",StoryRoute)   //Story Route
app.use("/book",BookRoute)     //Book Route
app.use("/user",UserRoute)     //User Route
app.use("/cart",CartRoute)     //Cart Route
app.use("/order",OrderRoute)   //Order Route
app.use("/comment",CommentRoute) //Comment Route




app.listen(PORT,()=>{
    Database()   //to connect to database
    console.log(`Server started on ${PORT}`)
})
