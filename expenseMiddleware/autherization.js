<<<<<<< HEAD

const jwt=require('jsonwebtoken')
const User=require('../ExpenseAppModels/user')
exports.authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log(token)
        const user=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(user.userId)
        User.findByPk(user.userId)
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
=======

const jwt=require('jsonwebtoken')
const User=require('../ExpenseAppModels/user')
exports.authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log(token)
        const user=jwt.verify(token,'poojasecretkey')
        console.log(user.userId)
        User.findByPk(user.userId)
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
>>>>>>> 23c8528c84259c599da7b5103eb33dfffcc1820b
//module.exports=authenticate