const dotenv=require('dotenv')
dotenv.config()
const Sequilize=require('sequelize')
console.log(process.env.DB_NAME,process.env.DB_PASSWORD,process.env.DB_HOST,process.env.DB_USERNAME)
const sequilize=new Sequilize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST
})

module.exports=sequilize