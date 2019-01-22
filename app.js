const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dateRoutes = require('./api/routes/dates');
const eventRoutes = require('./api/routes/events');

app.use(morgan('dev'));
// easily readable json/url encoded data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIOMS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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