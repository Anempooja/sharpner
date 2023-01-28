const Sequilize=require('sequelize')
const sequelize=require('../ExpenseAppUtil/database')
const incomes=Sequilize.define('income',{
    id:{
        type:Sequilize.INTEGER,
        primaryKey:true,
        unique:true,
        allowNull:false
    },
    description:{
        type:Sequilize.STRING,
        allowNull:false
    }
})
module.exports=incomes