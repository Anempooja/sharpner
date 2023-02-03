const Sequelize=require('sequelize');
const sequelize=require('../chatappUtil/database');
const Chat=sequelize.define('chat',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey:true
    
},name:{
    type:Sequelize.STRING
},email:{
    type:Sequelize.STRING,
    unique:true
},
phonenumber:{
    type:Sequelize.STRING
},password:{
    type:Sequelize.STRING
}

})
module.exports=Chat