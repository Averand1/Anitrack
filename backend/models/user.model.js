require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const crypto = require('crypto');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SALT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session_data: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false,
});

User.prototype.validPassword = function(password, salt, userPassword) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === userPassword
}

module.exports = User;