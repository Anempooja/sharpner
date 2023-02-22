const express=require('express')

const expenseController=require('../ExepenseAppControllers/addExpense')
const userAuthentication =require('../expenseMiddleware/autherization')
const router=express.Router()

router.post('/addExpense',userAuthentication.authenticate,expenseController.addExpense)
//  router.get('/download',userAuthentication.authenticate,expenseController.download)
router.get('/getExpense',userAuthentication.authenticate,expenseController.getExpense)
router.delete('/:expenseId',userAuthentication.authenticate,expenseController.deleteexpense)
module.exports=router;