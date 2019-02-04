const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dateRoutes = require('./api/routes/dates');
const eventRoutes = require('./api/routes/events');
const userRoutes = require('./api/routes/users');

mongoose.connect(
    'mongodb://tris:' + 
    process.env.MONGO_ATLAS_PW + 
    '@node-rest-data-shard-00-00-bvbma.mongodb.net:27017,node-rest-data-shard-00-01-bvbma.mongodb.net:27017,node-rest-data-shard-00-02-bvbma.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-data-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true
    }
);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
// easily readable json/url encoded data
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

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
app.use('/users', userRoutes);

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