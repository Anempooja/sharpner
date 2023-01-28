const Sequelize=require('sequelize')
const sequelize=require('../ExpenseAppUtil/database')
const Order=sequelize.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    paymentStatus:Sequelize.STRING
})
module.exports=Order