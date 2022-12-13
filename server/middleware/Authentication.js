const jwt=require("jsonwebtoken")
const Authentication=(req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1];
    if(token){
        const decoded=jwt.verify(token,process.env.JWT)
        if(decoded){
            const userID=decoded.id
           
            req.body.userId=userID
            next()
        }else{
            res.status(404).send({"msg":"Authentication Failed"})
        }
    }else{
        res.status(404).send({"msg":"Authentication Failed"})
    }
}

module.exports=Authentication