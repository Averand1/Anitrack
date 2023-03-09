const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./backend/config/db.config');

// connect to the database
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error:', err));

const app = module.exports = express();
// enable CORS
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/user', require('./backend/routes/userRoutes'));

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));