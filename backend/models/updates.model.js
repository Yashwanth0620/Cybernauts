const mongoose = require("mongoose");

const updatesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ExpiryDate: {
        type: Date,
        required: true
    },
  
})

module.exports = mongoose.model("update", updatesSchema);
