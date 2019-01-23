const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    description:{
        type: String,
        default: "A small description of an awesome event :D",
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate:{
        type: Date
    }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;