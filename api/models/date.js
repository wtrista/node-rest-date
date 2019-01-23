const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateMDY: String,
    dayOfWeek: String
});

module.exports = mongoose.model('Date', dateSchema);