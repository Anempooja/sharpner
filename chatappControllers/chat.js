const Chat=require('../chatappModels/chat');

exports.saveMessage=(req,res,next)=>{try{
    const message=req.params.message
    Chat.create({message})
    return res.status(200).json({message:'message saved successfully'})
}
catch(err){return res.status(400).json({message:'something went wrong'})}
    
}