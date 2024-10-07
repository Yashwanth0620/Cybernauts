const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
  
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    participants: [String],
    organizer: String,
    faculty: [String],
    winners: [{
        position: { type: String}, 
        name: { type: String}     
    }],
    cheifGuest : String,
    contributers : [{
        contribution: { type: String}, 
        roll: { type: String} 
    }]
})

module.exports = mongoose.model("Event", eventSchema);
