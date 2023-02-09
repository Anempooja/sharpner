const express=require('express')
const router=express.Router()
const groupController=require('../chatappControllers/group')
router.post('/createGroup',groupController.addgroup)
router.get('/findGroup/:userId',groupController.findGroup)
router.get('/groupChat/:groupId',groupController.groupChat)
module.exports=router