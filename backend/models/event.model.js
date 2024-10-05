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
        default: Date.now()
    },
    endDate: {
        type: Date,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    participants: [String],
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
    }
})

module.exports = mongoose.model("Event", eventSchema);
