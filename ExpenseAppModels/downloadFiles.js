const mongoose=require('mongoose')

const Schema=mongoose.Schema
const downloadFilesShema=new Schema({
  fileURL:{
    type:String,
    required:true
  }
})
module.exports=mongoose.model('DownloadFiles',downloadFilesShema)

// const Sequelize=require('sequelize')
// const sequelize=require('../ExpenseAppUtil/database')

// const downloadedfiles = sequelize.define("downloadedFiles", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   fileURL: Sequelize.STRING,
// });

// module.exports = downloadedfiles;