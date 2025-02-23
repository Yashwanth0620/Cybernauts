const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    year: { 
        type: String, 
        required: true,
        unique: true 
    },
    present: { 
        type: Boolean,
    },
    members : [{
        rollNo :{
            type : String,
            required : true,
        },
        name :{
            type : String,
            required : true,
        },
        designation :{
            type : String,      
            required : true,
        },
        description :{
            type : String,
        },
        position :{
            type : String,
        },
        image:{
            type : String,
        },
        mobileNo:{
            type : String,
        },
        email:{
            type : String,
        },
        contributions :[{
            description : String,
            image: String,
            eventId : String,
            eventName : String,
        }],
        // active: {
        //     type: Boolean,
        //     default: true
        // }
    }]
})

module.exports = mongoose.model("Member", memberSchema);
