const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

const Anime = sequelize.define('animes', {
    'id' : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    'title' : {
        type: DataTypes.STRING
    },
    'cover_image': {
        type:DataTypes.STRING
    }
}, {
    timestamps: false
})

Anime.sync()

module.exports = Anime;