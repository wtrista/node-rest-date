const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Date = require('../models/date');

router.get('/', (req, res, next) => {
    Date.find()
        .select('dateMDY dayOfWeek _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                dates: docs.map(doc => {
                    return {
                        date: doc.dateMDY,
                        day: doc.dayOfWeek,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/dates/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', (req, res, next) => {
    const date = new Date({
        _id: new mongoose.Types.ObjectId(),
        dateMDY: req.body.dateMDY,
        dayOfWeek: req.body.dayOfWeek
    });
    date
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json ({
                message: 'What? Again?!',
                createdDate: {
                    date: result.dateMDY,
                    day: result.dayOfWeek,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/dates/' + result._id
                    }
                }
            });
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    
})

router.get('/:dateId', (req, res, next) => {
    const id = req.params.dateId;
    Date.findById(id)
        .select('dateMDY dayOfWeek _id')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if(doc){
                res.status(200).json({
                    date: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/dates/' + doc._id
                    }
                });
            }else{
                res.status(404).json({
                    message: "This date doesn't exist..."
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    // if (id === 'first') {
    //     res.status(200).json ({
    //         message: 'Holy it happened!',
    //         id: id
    //     });
    // } else {
    //     res.status(200).json ({
    //         message: 'What? Again?!'
    //     });
    // }
});

router.patch('/:dateId', (req, res, next) => {
    const id = req.params.dateId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
        console.log()
    }
    Date.update({_id: id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'No idea why but updating this date...',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/dates/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    // res.status(200).json({
    //     message: 'Updated date!'
    // });
});

router.delete('/:dateId', (req, res, next) => {
    const id = req.params.dateId;
    Date.remove({
        _id: id
    })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted a record...why tho?',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/dates',
                    body: {dateMDY: 'String', dayOfWeek: 'String'}
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    // res.status(200).json({
    //     message: 'Deleted a record...why tho?'
    // });
});

module.exports = router;