const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const User = require('./user.model')
const Anime = require('./anime.model')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const AnimeStarred = sequelize.define('anime_starred', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
        onDelete: 'CASCADE'
      }
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
    isStarred: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
},
{
    timestamps: false
});

AnimeStarred.belongsTo(User, { foreignKey: 'user_id' });
AnimeStarred.belongsTo(Anime, { foreignKey: 'id' });

module.exportds = AnimeStarred