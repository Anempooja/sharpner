const express = require('express');
const dotenv=require('dotenv')
var sequelize=require('./chatappUtil/database')
const bodyParser = require('body-parser');

var cors = require('cors')
const Group=require('./chatappModels/group')
const User=require('./chatappModels/user')
const Chat=require('./chatappModels/chat')
const userGroup=require('./chatappModels/userGroup') 

var signupRouter=require('./chatappRoutes/signup')
var chatRouter=require('./chatappRoutes/chat')
var groupRouter=require('./chatappRoutes/group');

var app=express()

app.use(cors())
app.use(bodyParser.json({ extended: false }));
app.use('/user',signupRouter)
app.use('/chat',chatRouter)
app.use('/group',groupRouter)
User.hasMany(Chat)
Chat.belongsTo(User)

Group.hasMany(Chat)
Chat.belongsTo(Group)

Group.belongsToMany(User,{through:userGroup})
User.belongsToMany(Group,{through:userGroup})
sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err));