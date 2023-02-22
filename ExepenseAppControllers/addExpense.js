const Expense=require('../ExpenseAppModels/expense');
const AWS=require('aws-sdk')

var limit=5

 
 const s3Services=require('../ExpenseServices/s3Services')

exports.download=async(req,res)=>{
    try{
    const expenses=await Expense.find({userId:req.user.id})
   
    const stringifiedExpenses=JSON.stringify(expenses)
    const filename=`${req.user.id}/${new Date()}Expense.txt`
    const fileURL=await s3Services.uploadToS3(stringifiedExpenses,filename)

    return res.status(200).json({fileURL,date:req.user.createdAt,success:true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({fileURL:'',success:false})
    }
}

exports.addExpense=async(req,res,next)=>{
    try{

        if(!req.body.amount||!req.body.description||!req.body.category){
            console.log('please fill all the details')
            res.status(500).json({err:'not filled'})        }
        const {amount,description,category}=req.body;


        const expenses=new Expense({amount:amount,description:description,category:category,userId:req.user._id})
        expenses.save()

        res.status(201).json({expenses})
    }
    catch(err){
        console.log(err)
    }
}
exports.getExpense=async(req,res,next)=>{
    try{
     
        const page=req.query.page
      
        const totalExpenses=await Expense.count({userId:req.user.id})
        console.log(req.user.id)
        const expenses=await Expense.find({userId:req.user.id})
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()
     
        
        res.status(200).json({
            user:req.user,
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
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteexpense=async(req,res,next)=>{try{
    
    if(!req.params.expenseId){
        console.log('expense not found')
        res.status(500).json({err:'not found'})      
    }

    const expenseId = req.params.expenseId;
    
    await Expense.deleteOne({_id:expenseId})
    .then((response)=>{
        console.log(response,'deleteeeeeeeeeeeeeeee')
        if(response.deletedCount===0){
            res.json({message:'expense can not be deleted as it belongs to other',status:400})
        }
        else if(response.deletedCount===1){
            res.json({message:'deleted successfully',status:200})
        }
    })

  }

    catch(err){console.log(err)

  }}


