const express = require('express');
const app = express();
const morgan = require('morgan');

const dateRoutes = require('./api/routes/dates');
const eventRoutes = require('./api/routes/events');

app.use(morgan('dev'));

// routes
app.use('/dates', dateRoutes);
app.use('/events', eventRoutes);

// if reach here, means no routes found
app.use((req, res, next) => {
    const error = new Error('No Fitting Rout Found...');
    error.status = 404;
    // forward the error request
    next(error);
});

// handles all kinds of errors thrown from anywhere
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;