const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json ({
        message: 'Handling GET requests to /dates'
    });
})

router.post('/', (req, res, next) => {
    const date = {
        dateMDY: req.body.dateMDY,
        dayOfWeek: req.body.dayOfWeek
    };
    res.status(201).json ({
        message: 'Handling POST requests to /dates',
        createdDate: date
    });
})

router.get('/:datesId', (req, res, next) => {
    const id = req.params.datesId;
    if (id === 'first') {
        res.status(200).json ({
            message: 'Holy it happened!',
            id: id
        });
    } else {
        res.status(200).json ({
            message: 'What? Again?!'
        });
    }
});

router.patch('/:datesId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated date!'
    });
});

router.delete('/:datesId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted a record...why tho?'
    });
});

module.exports = router;