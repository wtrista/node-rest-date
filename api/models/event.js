const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {type: mongoose.Schema.Types.ObjectId, ref: 'Date', required: true },
    mood: {type: String, required: true}
});

module.exports = mongoose.model('Event', eventSchema);