const express=require('express')
const router=express.Router()
const chatController=require('../chatappControllers/chat')
router.get('/message/:message',chatController.saveMessage)

module.exports=router