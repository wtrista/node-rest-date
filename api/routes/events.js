const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Events were fetched'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Events were created'
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