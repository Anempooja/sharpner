const User=require('../chatappModels/user');

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
function getAccessToken(id){
    return jwt.sign({id},'poojasecretkey')
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
      const {name,email,password,phonenumber}=req.body

      bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
        const data=await User.create({name,email,password:hash,phonenumber})

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
        console.log(users[0].id)
        bcrypt.compare(password,users[0].password,(err,result)=>{
          if(err){
            throw new Error('user not found')
          }
          if(result){
            return res.status(200).json({success:true,message:'user logged in successfuly ',token:getAccessToken(users[0].id),user:users[0]})
          }
          else{
            return res.status(401).json({success:false,message:'password is incorrect' })
          }
        })  
  }
  else{
    return res.status(404).json({success:false,message:"user not found"})
  }
})
  .catch(err=>{console.log(err)})

}
catch(err){console.log(err)}
};
exports.users=async(req,res,next)=>{try{
 const users=await User.findAll()
// console.log(users)
res.status(200).json({users:users})
}
catch(err){console.log(err)}
}