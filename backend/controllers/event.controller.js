const errorHandler = require("express-async-handler");
const eventModel = require("../models/event.model");

// @desc to get all the events
// @API GET /events
// @access PUBLIC
const getEvents = errorHandler(async (req, res) => {
  try {
    const events = await eventModel.find({}); // Fetch all events

    // Get the current date and time
    const now = new Date();

    // Filter events into upcoming and completed
    const upcomingEvents = events.filter(
      (event) => new Date(event.startDate) > now
    );
    const completedEvents = events.filter(
      (event) => new Date(event.startDate) <= now
    );

    res.status(200).json({ upcomingEvents, completedEvents });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// @desc to get all the events
// @API GET /events/recent
// @access PUBLIC
const getRecentEvent = errorHandler(async (req, res) => {
  try {
    const currentDate = new Date();

    // Fetch events whose endDate is in the past
    const events = await eventModel
      .find({ endDate: { $lt: currentDate } })
      .sort({ endDate: -1 })
      .limit(1);

    if (events.length === 0) {
      return res.status(404).json({ message: "No recent events found" });
    }

    res.status(200).json(events[0]);
  } catch (error) {
    console.error("Error fetching recent event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

  res.status(200).json({ message: "Member added successfully" });
});

module.exports = { getEvents, addParticipant, getRecentEvent };
