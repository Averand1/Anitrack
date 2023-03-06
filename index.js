const axios = require('axios')
const mysql = require('mysql2')
const express = require('express')
const app = express();
require('dotenv').config();
const { Sequelize } = require('sequelize');
const User = require('./backend/models/user.model')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

// API endpoint for anime data
let url = "https://kitsu.io/api/edge/anime"

// Function to establish a connection to the database
// async function connectToDatabase() {
//   try {
//     const connection = await mysql.createConnection({
//       'host':'//',
//       'user':'//',
//       'password':'//',
//       'database': '//'
//   });
//     return connection

//   } catch (error) {
//     console.log('Failed to establish connection', error);
//     return null;
//   }
// }


// User.create({
//   email: 'john3.doe@example.com',
//   password: 'password123'
// }).then(user => {
//   console.log('New user created:');
//   console.log(user);
// }).catch(err => {
//   console.error('Error creating user:', err);
// });


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database', error);
});


app.listen(3000, () => {
  console.log('Server is running')
})