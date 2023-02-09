const Sequelize=require('sequelize');
const sequelize=require('../chatappUtil/database');
const UserGroup=sequelize.define('userGroup',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey:true
   },


})
module.exports=UserGroup