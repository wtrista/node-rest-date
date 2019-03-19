const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
    // how files are stored
    destination: function(req, file, callback){
        callback(null, './uploads/');
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    } else {
        callback(null, false);
    }
};

const upload = multer({storage: storage, fileFilter: fileFilter});

const Event = require('../models/event');
const Date = require('../models/date');

router.get('/', checkAuth, (req, res, next) => {
    Event
        .find()
        .select('date mood _id photo')
        .populate('date', 'dateMDY')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                events: docs.map(doc => {
                    return {
                        _id: doc._id,
                        date: doc.date,
                        mood: doc.mood,
                        photo: doc.photo,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/events/' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', checkAuth, upload.single('photo'), (req, res, next) => {
    // single: one file at a time
    console.log(req.file);
    Date.findById(req.body.dateId)
        .then(date => {
            if(!date) {
                return res.status(404).json({
                    message: 'Nothing happended on that day...'
                })
            }
            const event = new Event({
                _id: mongoose.Types.ObjectId(),
                mood:req.body.mood,
                date: req.body.dateId,
                // photo: req.file.path
            });
            if(req.file){
                event.photo = req.file.path;
            }
            return event.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Mood added...',
                createEvent: {
                    _id: result._id,
                    date: result.date,
                    mood: result.mood
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/events/' + result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something wrong!',
                error: err
            })
        })
});

router.get('/:eventId', checkAuth, (req, res, next) => {
    Event.findById(req.params.eventId)
        .select('date mood _id photo')
        .populate('date', 'dateMDY')
        .exec()
        .then(event => {
            if(!event){
                return res.status(404).json({
                    message: 'No mood added...yet'
                })
            }
            res.status(200).json({
                event: event,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/events'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete('/:eventId', checkAuth, (req, res, next) => {
    Event.remove({_id: req.params.eventId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted mood...',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/events',
                    body: {dateId: "ID", mood: "String"}
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;