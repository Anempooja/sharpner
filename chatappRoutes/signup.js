const express=require('express')
const router=express.Router()
const signUpController=require('../chatappControllers/signup')
router.post('/signup',signUpController.signUp)
router.post('/login',signUpController.login)
router.get('/users',signUpController.users)
module.exports=router