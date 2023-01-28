const Sequilize=require('sequelize')
const sequilize=new Sequilize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST
})
module.exports=sequilize