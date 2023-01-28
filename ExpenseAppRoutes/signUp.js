const path = require('path');

const express = require('express');
const signUpController=require('../ExepenseAppControllers/user')


const router=express.Router()
router.post('/signup',signUpController.signUp)
router.post('/login',signUpController.login)

module.exports=router