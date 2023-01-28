const Sequelize=require('sequelize')
const sequelize=require('../ExpenseAppUtil/database')
const forgotPasswordRequests=sequelize.define('fogotPasswordRequest',{
    id:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER
    },
    isActive:{
        type:Sequelize.BOOLEAN
    }
})
module.exports=forgotPasswordRequests