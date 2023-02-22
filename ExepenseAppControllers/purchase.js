
const Razorpay=require('razorpay')

const Order=require('../ExpenseAppModels/orders')


const User = require('../ExpenseAppModels/user')
const Expense = require('../ExpenseAppModels/expense')

exports.membership=async(req,res,next)=>{
    try{

        var rzp= new Razorpay({
            key_id:'rzp_test_QAEqBWqdhtoBaX',
            key_secret: "YfdeSMfWAsHyajYr5oVVaW3f"
        })
       //console.log(process.env.RAZORPAY_KEY,process.env.RAZORPAY_SECRET_KEY)
        const amount=25000;
        await rzp.orders.create({amount,currency:'INR'},(err,order)=>{
            if(err){
                console.log(err)
                throw new Error(err)
            }

           const orders=new Order({paymentid:null,orderid:order.id,paymentStatus:'PENDING',userId:req.user.id})
           orders.save()
           .then(()=>{
               
                return res.status(200).json({order,key_id:rzp.key_id})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
    }
    catch(err){
        console.log(err)
        res.status(403).json({message:'something went wrong',error:err})
    }
}
exports.updateTransactionStatus=async(req,res)=>{
    try{

        const user=User.findOne({_id:req.user.id})
        const {payment_id,order_id}=req.body
        const order=await Order.findOne({orderid:order_id})
        
           order.updateOne({paymentid:payment_id,paymentStatus:'SUCCESSFUL'})

           user.updateOne({ispremiumuser:true})
        .then(()=>{
                    return res.status(202).json({success:true,message:'Transaction sucessful'})
                })   
                .catch(err=>{
                    console.log(err)
                    throw new Error(err)})
        }
        catch(err){
            res.status(400).json({error:err})
        }
}
exports.leaderboard=async(req,res,next)=>{

try{
    const users=(await User.find().select('name'))
    const userLeaderboardDetails=[]
    const promise1=users.map(async(user)=>{
        
        const expenses=await Expense.find({userId:user.id}).select('amount')
        
        let sum=0
        for(var i=0;i<expenses.length;i++){
            sum+=expenses[i].amount
        }
        
        userLeaderboardDetails.push(sum) 
       
    })
    Promise.all(promise1).then(()=>{
         
    res.status(200).json({users:users,userLeaderboardDetails})
    })
   
}
catch(err){
    console.log(err)
}
}

   