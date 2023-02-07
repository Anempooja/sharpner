const Sequelize=require('sequelize');
const sequelize=require('../chatappUtil/database');
const Chat=sequelize.define('chat',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey:true
},
message:{
    type:Sequelize.STRING,
    allowNull:false
},
name:{
    type:Sequelize.STRING
}
})
module.exports=Chat