const errorHandler = require("express-async-handler");


// @desc to get all the core body members of particular year
// @API GET /admin/events
const getEvents = errorHandler(async (req, res) => {
    
});

// @desc to add a new event
// @API POST /admin/events
const addEvent = errorHandler(async (req, res) => {
    
});

// @desc To update the event details
// @API PATCH /admin/events/:id
const updateEvent = errorHandler(async (req, res) => {
    
});

// @desc To delete an event
// @API DELETE /admin/events/:id
const deleteEvent = errorHandler(async (req, res) => {
    
});

// @desc To post updates on the website
// @API POST /admin/notify
const addUpdates = errorHandler(async (req, res) => {
    
});

// @desc to send mail for all event members
// @API POST /admin/events/mail/:eventid/
const sendMail = errorHandler(async (req, res) => {

});

// also add controllers for members functionality

module.exports = { getEvents, addEvent, updateEvent, deleteEvent, addUpdates, sendMail };
