const Chat=require('../chatappModels/chat');

exports.saveMessage=(req,res,next)=>{try{
    const message=req.params.message
    Chat.create({message,userId:req.user.id,name:req.user.name})
    return res.status(200).json({message:'message saved successfully'})
}
catch(err){return res.status(400).json({message:'something went wrong'})}
    
}
exports.displayChat=async(req,res,next)=>{
try{
    const chats=await Chat.findAll()

    //console.log(chats)
    return res.status(200).json({chats})
}
catch(err){
    console.log(err)
}
}