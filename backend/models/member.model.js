const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
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
    year :{
        type : String,
        required : true,
    },
    image:{
        type : Buffer,  
    },
    contributions :{
        type : [String],
      
    },
    active : Boolean, 
})

module.exports = mongoose.model("Member", memberSchema);
