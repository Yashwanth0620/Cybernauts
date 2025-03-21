const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Blog", blogSchema);
