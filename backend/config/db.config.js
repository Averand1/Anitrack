require('dotenv').config('../../.env')
const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.RDS_DB_NAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, {
  host: process.env.RDS_HOST,
  dialect: 'mysql'
});
