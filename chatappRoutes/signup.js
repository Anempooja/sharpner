const express=require('express')
const router=express.Router()
const signUpController=require('../chatappControllers/signup')
router.post('/signup',signUpController.signUp)
router.post('/login',signUpController.login)
module.exports=router