const Sequelize=require('sequelize');
const sequelize=require('../chatappUtil/database');
const Group=sequelize.define('group',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey:true
   },
name:{
    type:Sequelize.STRING
},
createdBy:{
    type:Sequelize.STRING
}


})
module.exports=Group