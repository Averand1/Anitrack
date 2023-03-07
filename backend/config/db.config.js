const Sequelize = require('sequelize');

module.exports = new Sequelize('anime', 'root', 'batmanjoker', {
  host: 'localhost',
  dialect: 'mysql'
}); 