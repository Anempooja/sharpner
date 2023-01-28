const express=require('express')

const purchaseController=require('../ExepenseAppControllers/purchase')
const userAuthentication =require('../expenseMiddleware/autherization')
const router=express.Router()

router.get('/membership',userAuthentication.authenticate,purchaseController.membership)
router.post('/updateTransactionStatus',userAuthentication.authenticate,purchaseController.updateTransactionStatus)

router.get('/leaderboard',userAuthentication.authenticate,purchaseController.leaderboard)
module.exports=router;