const Sequilize=require('sequelize')
const sequilize=new Sequilize('expense','root','pooja@123',{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequilize