require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const User = sequelize.define('users', {
    id: {
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
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    SALT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    session_data: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false,
});

User.prototype.validPassword = function(password, salt, userPassword) {
  const hash = bcrypt.hashSync(password, salt);
  return bcrypt.compareSync(userPassword, hash);
}

User.sync()

module.exports = User;