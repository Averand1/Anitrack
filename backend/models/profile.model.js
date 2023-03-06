require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user.model');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const Profile = sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    profile_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
        type: DataTypes.SMALLINT,
    },
    age: {
        type:DataTypes.INTEGER
    },
  },
  {
    timestamps: false
  });
  
  
Profile.belongsTo(User, { foreignKey: 'user_id' });  
module.exports = Profile; 