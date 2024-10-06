const errorHandler = require("express-async-handler");


// @desc to get all the events
// @API GET /events
// @access PUBLIC
const getEvents = errorHandler(async (req, res) => {
    const events = await eventModel.find({});
    res.status(200).json(events);
});

// @desc to add a participant for an event
// @API PATCH /events/:id
// @access PUBLIC
const addParticipant = errorHandler(async (req, res) => {
    const eventId = req.params.eventid;
    const participant = req.body.member;

    const event = await eventModel.findByIdAndUpdate(
        eventId,
        { $push: { participants: participant } },
        { new: true }
    );

    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    res.status(200).json({ message: "Member added successfully"});
});


module.exports = { getEvents, addParticipant };
