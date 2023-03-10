const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config('../../.env');

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const sessionStore = new MySQLStore(options);

const sessionMiddleware = session({
  key: process.env.SESS_NAME,
  secret: process.env.SESS_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
});

module.exports = sessionMiddleware;