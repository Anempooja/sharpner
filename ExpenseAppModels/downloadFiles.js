const Sequelize=require('sequelize')
const sequelize=require('../ExpenseAppUtil/database')

const downloadedfiles = sequelize.define("downloadedFiles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fileURL: Sequelize.STRING,
});

module.exports = downloadedfiles;