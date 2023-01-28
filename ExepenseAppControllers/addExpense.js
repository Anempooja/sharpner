const Expense=require('../ExpenseAppModels/expense');

exports.addExpense=async(req,res,next)=>{
    try{
        
        if(!req.body.amount||!req.body.description||!req.body.category){
            console.log('please fill all the details')
            res.status(500).json({err:'not filled'})        }
        const {amount,description,category}=req.body;
        
        
        const expense=await Expense.create({amount,description,category,userId:req.user.id})
       
        res.status(201).json({expense})
    }
    catch(err){
        console.log(err)
    }
}
exports.getExpense=async(req,res,next)=>{
    try{
    
        const expenses=await Expense.findAll({where:{userId:req.user.id}})
        return res.status(200).json({Expenses:expenses,user:req.user})
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteExpense=async(req,res,next)=>{try{
    if(!req.params.expenseId){
        console.log('expense not found')
        res.status(500).json({err:'not found'})      
    }
    
    const expenseId = req.params.expenseId;
    console.log(expenseId)
    await Expense.destroy({where:{id:expenseId,userId:req.user.id}})
    .then((response)=>{
        if(response===0){
            res.status(400).json({message:'expense can not be deleted as it belongs to other'})
        }
        else if(response===1){
            res.status(200).json({message:'deleted successfully'})
        }
    })
    
  }
    
    catch(err){console.log(err)
    
  }}