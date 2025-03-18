const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        default : "admin",
        enum: ["admin", "superadmin"]
    }
})

module.exports = mongoose.model("Admin", adminSchema);
