
const Razorpay=require('razorpay')

const Order=require('../ExpenseAppModels/orders')

const dotenv=require('dotenv')
const User = require('../ExpenseAppModels/user')
const Expense = require('../ExpenseAppModels/expense')
const e = require('cors')
const sequilize = require('../ExpenseAppUtil/database')
dotenv.config()
exports.membership=async(req,res,next)=>{
    try{
        
        var rzp= new Razorpay({
            key_id: 'rzp_test_77fx4M5GdoisqN',
            key_secret: 'I64i5zwEr32UpmLsHegmdSCS'
        })
       
        const amount=25000;
        await rzp.orders.create({amount,currency:'INR'},(err,order)=>{
            if(err){
                console.log(err)
                throw new Error(err)
            }
            
            req.user.createOrder({orderid:order.id,paymentStatus:'PENDING'}).then(()=>{
                console.log('yyy')
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
        console.log('pooja')
        //console.log(req.body)
        const {payment_id,order_id}=req.body
        const order=await Order.findAll({where:{orderid:order_id}})
        console.log(order)
            const promise1=order[0].update({paymentid:payment_id,paymentStatus:'SUCCESSFUL'})
            const promise2=req.user.update({ispremiumuser:true})
                promise.all(promise1,promise2).then(()=>{
                    return res.status(202).json({success:true,message:'Transaction sucessful'})
                })   
                .catch(err=>{throw new Error(err)})
        }
        catch(err){
            res.status(400).json({error:err})
        }
}
exports.leaderboard=async(req,res,next)=>{

try{
    const userLeaderboardDetails=await User.findAll({
        attributes:['id','name',[sequilize.fn('sum',sequilize.col('expenses.amount')),'total_cost']],
        include:[
            {
                model:Expense,
                attributes:[]
            }
        ],
        group:['user.id'],
        order:[['total_cost','DESC']]
    })
    res.status(200).json(userLeaderboardDetails)
}
catch(err){
    console.log(err)
}
}
        
    
   