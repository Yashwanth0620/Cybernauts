const errorHandler = require("express-async-handler");


// @desc to get all the events
// @API GET /events
// @access PUBLIC
const getEvents = errorHandler(async (req, res) => {
    
});

// @desc to add a participant for an event
// @API PATCH /events/:id
// @access PUBLIC
const addParticipant = errorHandler(async (req, res) => {
    
});

module.exports = { getEvents, addParticipant };
