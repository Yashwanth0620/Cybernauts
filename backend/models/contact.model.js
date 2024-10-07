const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    desc: {
        type: String, 
        required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: '5d' }
})

module.exports = mongoose.model("Contact", contactSchema);
