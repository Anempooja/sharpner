const jwt=require('jsonwebtoken')
const User=require('../chatappModels/user')
const dotenv=require('dotenv')
dotenv.config()
const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log(token)
        const user=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(user.id)
        User.findByPk(user.id)
        .then(user=>{
            console.log(JSON.stringify(user))
            req.user=user
            next()
            })
            .catch(err=>console.log(err)) 
    }
    catch(err){
        console.log(err)
        return res.status(401).json({success:false})
    }
}
module.exports={
    authenticate
}