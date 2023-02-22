const mongoose=require('mongoose')
const Schema=mongoose.Schema
const orderSchema=new Schema({
    paymentid:{
        type:String
    } ,
    orderid:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }
})
module.exports=mongoose.model('Order',orderSchema)



// const Sequelize=require('sequelize')
// const sequelize=require('../ExpenseAppUtil/database')
// const Order=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true,
//         allowNull:false
//     },
//     paymentid:Sequelize.STRING,
//     orderid:Sequelize.STRING,
//     paymentStatus:Sequelize.STRING
// })
// module.exports=Order