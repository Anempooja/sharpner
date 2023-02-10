const express = require('express');
var CronJob = require('cron').CronJob;
var sequelize=require('./chatappUtil/database')
const bodyParser = require('body-parser');

var cors = require('cors')
const Group=require('./chatappModels/group')
const User=require('./chatappModels/user')
const Chat=require('./chatappModels/chat')
const userGroup=require('./chatappModels/userGroup') 
//const ArchievedChat=require('../chatappModels/archievedChats')

var signupRouter=require('./chatappRoutes/signup')
var chatRouter=require('./chatappRoutes/chat')
var groupRouter=require('./chatappRoutes/group');
const ArchievedChat = require('./chatappModels/archievedChats');

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

User.hasMany(ArchievedChat)
ArchievedChat.belongsTo(User)

Group.hasMany(ArchievedChat)
ArchievedChat.belongsTo(Group)

Group.belongsToMany(User,{through:userGroup})
User.belongsToMany(Group,{through:userGroup})

var job = new CronJob(
	'* * 3 * * *',
	async function() {
		// console.log('You will see this message every second');
        const chats=await Chat.findAll()
        chats.forEach(chat => {
            ArchievedChat.create({message:chat.message,userId:chat.userId,name:chat.name,groupId:chat.groupId,createdAt:chat.createdAt,updatedAt:chat.updatedAt})
            Chat.destroy({where:{id:chat.id}})
        });
        
	},
	null,
	true,
	'Asia/Kolkata'
);
sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err));