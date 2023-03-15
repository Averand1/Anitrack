const express = require('express');
const profileRouter = require('./backend/routes/profileRoutes')
const userRouter = require('./backend/routes/userRoutes')
const animeRouter = require('./backend/routes/animeRoutes')
const starredRouter = require('./backend/routes/starredRoutes')
const cors = require('cors');
const bodyParser = require('body-parser');
const sessionMiddleware =  require('./backend/middleware/session')
const db = require('./backend/config/db.config');

// connect to the database
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error:', err));

const app = express();

app.use(sessionMiddleware)
// enable CORS
app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', userRouter);
app.use('/api', animeRouter);
app.use('/api', profileRouter);
app.use('/api', starredRouter);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));