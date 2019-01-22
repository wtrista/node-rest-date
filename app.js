const express = require('express');
const app = express();
const morgan = require('morgan');

const dateRoutes = require('./api/routes/dates');
const eventRoutes = require('./api/routes/events');

app.use(morgan('dev'));

// routes
app.use('/dates', dateRoutes);
app.use('/events', eventRoutes);

module.exports = app;