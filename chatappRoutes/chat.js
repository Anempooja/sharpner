const express=require('express')
const router=express.Router()
const chatController=require('../chatappControllers/chat')
const authetication=require('../chatappMiddleware/autheticate')
router.get('/message/:message',authetication.authenticate,chatController.saveMessage)
router.get('/display',chatController.displayChat)
module.exports=router