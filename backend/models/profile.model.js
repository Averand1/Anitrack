require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user.model');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const Profile = sequelize.define('profiles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    last_name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
  
  
Profile.belongsTo(User, { foreignKey: 'user_id' });  
Profile.sync()
module.exports = Profile; 