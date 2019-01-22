const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Events were fetched'
    })
});

router.post('/', (req, res, next) => {
    const event = {
        eventDescription: req.body.eventDescription,
        mood: req.body.mood
    };
    res.status(201).json({
        message: 'Events were created',
        event: event
    })
});

router.get('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'Events details',
        eventId : req.params.eventId
    })
});

router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'Events deleted'
    })
});

module.exports = router;