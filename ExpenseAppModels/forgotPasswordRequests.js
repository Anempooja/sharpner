const mongoose=require('mongoose')

const Schema=mongoose.Schema

const fogotPasswordRequestSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
})
module.exports=mongoose.model('fogotPasswordRequest',fogotPasswordRequestSchema)


// const Sequelize=require('sequelize')
// const sequelize=require('../ExpenseAppUtil/database')
// const forgotPasswordRequests=sequelize.define('fogotPasswordRequest',{
//     id:{
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     userId:{
//         type:Sequelize.INTEGER
//     },
//     isActive:{
//         type:Sequelize.BOOLEAN
//     }
// })
// module.exports=forgotPasswordRequests