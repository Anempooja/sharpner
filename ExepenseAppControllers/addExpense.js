const Expense=require('../ExpenseAppModels/expense');
const AWS=require('aws-sdk')

const limit=10;

 const UserServices=require('../ExpenseServices/userServices')
 const s3Services=require('../ExpenseServices/s3Services')

const download=async(req,res)=>{
    try{
    const expenses=await UserServices.getExpenses(req)
    console.log(expenses)
    const stringifiedExpenses=JSON.stringify(expenses)
    const filename=`${req.user.id}/${new Date()}Expense.txt`
    const fileURL=await s3Services.uploadToS3(stringifiedExpenses,filename)
    
    return res.status(200).json({fileURL,success:true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({fileURL:'',success:false})
    }
}

 const addExpense=async(req,res,next)=>{
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
const getExpense=async(req,res,next)=>{
    try{
        const page=req.query.page
        console.log(page)
        const totalExpenses=await Expense.count({where:{userId:req.user.id}})
        console.log(totalExpenses)
        const expenses=await req.user.getExpenses({
            offset: (page - 1) * limit,
            limit: limit
        })
        
        res.status(200).json({
            expenses,
            success: true,
            data: {
              currentPage: +page,
              hasNextPage: totalExpenses > page * limit,
              hasPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              lastPage: Math.ceil(totalExpenses / limit),
            },
          });
        // const expenses=await Expense.findAll({where:{userId:req.user.id}})
        // return res.status(200).json({Expenses:expenses,user:req.user})
    }
    catch(err){
        console.log(err)
    }
}

const deleteExpense=async(req,res,next)=>{try{
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
  module.exports={
    addExpense,
    getExpense,
    deleteExpense,
    download
  }