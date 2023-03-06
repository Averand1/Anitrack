const { Sequelize } = require('sequelize');
const User = require('./models/user.model')
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
 
User.create({
  email: 'john3.doe@example.com',
  password: 'password123'
}).then(user => {
  console.log('New user created:');
  console.log(user);
}).catch(err => {
  console.error('Error creating user:', err);
});


sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database', error);
  });