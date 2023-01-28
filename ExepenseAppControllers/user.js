const User=require('../ExpenseAppModels/user');

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
function getAccessToken(id){
    return jwt.sign({userId:id},'poojasecretkey')
}

exports.signUp= async(req, res, next) => {
    try{
      User.findAll()
      .then(users=>{
        for(var i=0;i<users.length;i++){
          if(users[i].name==req.body.email){
            console.error('user already exists')
            return
          }
        }
      })
      const {name,email,password,ispremiumuser}=req.body
      
      bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
        const data=await User.create({name,email,password:hash,ispremiumuser})
          
        return res.status(201).json({data})})
      }
      
      
      catch(err){
        res.status(500).json({error:err})
          console.log(err)
      }}
exports.login=async(req,res,next)=>{
 try{
  const {email,password}=req.body;
    await User.findAll({where:{email}})
    .then(users=>{
      if(users.length>0){
        bcrypt.compare(password,users[0].password,(err,result)=>{
          if(err){
            throw new Error('user not found')
          }
          if(result){
            return res.status(200).json({sucess:true,message:'user logged in successfuly ',token:getAccessToken(users[0].id)})
          }
          else{
            return res.status(404).json({sucess:false,message:'password is incorrect' })
          }
        })  
  }
})
  .catch(err=>{console.log(err)})

}
catch(err){console.log(err)}
};

