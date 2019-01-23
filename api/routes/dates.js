const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Date = require('../models/date');

router.get('/', (req, res, next) => {
    Date.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
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
                message: 'Handling POST requests to /dates',
                createdDate: result
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
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json(doc);
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
            console.log(result);
            res.status(200).json(result);
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
            res.status(200).json(result);
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