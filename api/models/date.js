const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dateMDY: {type: String, required: true},
    dayOfWeek: {type: String, required: true}
});

module.exports = mongoose.model('Date', dateSchema);