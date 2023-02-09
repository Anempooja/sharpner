const express=require('express')
const router=express.Router()
const groupController=require('../chatappControllers/group')
router.post('/createGroup',groupController.addgroup)
router.get('/findGroup/:userId',groupController.findGroup)
router.get('/groupChat/:groupId',groupController.groupChat)
router.get('/findusers/:groupId',groupController.findUsers)
router.get('/deleteusers/:groupId/:option',groupController.deleteUser)
module.exports=router