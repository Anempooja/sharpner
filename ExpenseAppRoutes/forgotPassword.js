const express=require('express')
const router=express.Router()
 const forgotPasswordContoller=require('../ExepenseAppControllers/forgotPassword')
 router.use('/forgotpassword/:emailId',forgotPasswordContoller.forgotPassword)
 router.use('/resetPassword/:uuid',forgotPasswordContoller.resetPassword)
 router.use('/updatePassword/:id',forgotPasswordContoller.updatepassword)
 module.exports=router