const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const User = require('./user.model')
const Anime = require('./anime.model')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' 
});

const starredAnime = sequelize.define('starred_animes', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'user_id',
      onDelete: 'CASCADE'
    }
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  }, 
  anime_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'anime',
      key: 'id',
      onDelete: 'CASCADE'
    }
  },
  starred: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: null,
  }
}, {
  timestamps: false,
  foreignKey: 'user_id'
});

starredAnime.removeAttribute('id')
starredAnime.belongsTo(User, { foreignKey: 'user_id' });
starredAnime.belongsTo(Anime, { foreignKey: 'id' });
module.exports = starredAnime;