const express = require('express');
const createError = require('http-errors');
const app = express();
const employeesRoute = require('./config/routes.config');
const bodyParser = require('body-parser'); // Add body-parser middleware

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Use the employeesRoute middleware for /api route
app.use('/api', employeesRoute);

// Route to handle the default route '/'
app.get('/', (req, res) => {
  res.send('Welcome to My Express API');
});

// Error Handling for Route Not Found
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.info(`Application running at port ${port}`);
  console.log('Ready!');
});
