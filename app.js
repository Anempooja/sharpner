const express = require('express');
const dotenv=require('dotenv')
var sequelize=require('./chatappUtil/database')
const bodyParser = require('body-parser');

var cors = require('cors')

const User=require('./chatappModels/user')

var signupRouter=require('./chatappRoutes/signup')

var app=express()

app.use(cors())
app.use(bodyParser.json({ extended: false }));
app.use('/user',signupRouter)

sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>console.log(err));