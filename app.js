const express = require('express');
const app = express();

const dateRoutes = require('./api/routes/dates');
const eventRoutes = require('./api/routes/events');

app.use('/dates', dateRoutes);
app.use('/events', eventRoutes);

module.exports = app;