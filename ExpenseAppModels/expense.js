const Sequelize=require('sequelize')
const sequelize=require('../ExpenseAppUtil/database')
const Expense=sequelize.define('expense',{
    id:{type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description :{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
    })
    module.exports=Expense
    