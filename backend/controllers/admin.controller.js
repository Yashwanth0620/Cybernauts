const errorHandler = require("express-async-handler");
const updatesModel = require("../models/updates.model");
const eventModel = require("../models/event.model");

const {
  eventUpdateMail,
  updateRejection,
  sendMailResponse,
} = require("./mail.controller");
const contactModel = require("../models/contact.model");

// @desc to get all the core body members of particular year
// @API GET /admin/events
const getEvents = errorHandler(async (req, res) => {
  const events = await eventModel.find({});
  res.status(200).json(events);
});

// @desc to add a new event
// @API POST /admin/events
const addEvent = errorHandler(async (req, res) => {
  const event = req.body;
  await eventModel.create(event);
  res.status(200).json({ message: "Event added successfully" });
});

// @desc To update the event details
// @API PATCH /admin/events/:id
const updateEvent = errorHandler(async (req, res) => {
  const id = req.params.id;
  const event = req.body;
  const updatedEvent = await eventModel.findByIdAndReplace(id, event);
  if (!updatedEvent) {
    res.status(404);
    throw new Error("Event not found");
  } else res.status(200).json({ message: "Event Deleted Successfully" });
});

// @desc To delete an event
// @API DELETE /admin/events/:id
const deleteEvent = errorHandler(async (req, res) => {
  const id = req.params.id;
  const event = await eventModel.findByIdAndDelete(id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  } else res.status(200).json({ message: "Event Deleted Successfully" });
});

// @desc To post updates on the website
// @API POST /admin/notify
const addUpdates = errorHandler(async (req, res) => {
  const update = req.body;
  await updatesModel.create(update);
  res.status(200).json({ message: "update added successfully" });
});

// @desc to send mail for all event members
// @API POST /admin/events/mail/:eventid/
const sendMail = errorHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const { notice } = req.body;
  const event = await eventModel.findById(eventId);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  try {
    await eventUpdateMail(event.participants, notice);
    res.status(200).json({ message: "Mail sent successfully" });
  } catch {
    res.status(500);
    throw new Error("Mail not sent");
  }
});

// @desc to remove a participant for an event
// @API PATCH /events/:id
// @access PUBLIC
const removeParticipant = errorHandler(async (req, res) => {
  const eventId = req.params.eventid;
  const participant = req.body.participant;

  const event = await eventModel.findByIdAndUpdate(
    eventId,
    { $pull: { participants: participant } },
    { new: true }
  );

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  try {
    await updateRejection(participant);
    res.status(200).json({ message: "Member removed successfully" });
  } catch {
    res.status(500);
    throw new Error("Mail not sent");
  }
});

const sendResponse = errorHandler(async (req, res) => {
  const contactId = req.params.contactId;
  const { response } = req.body;

  if (!response) {
    return res
      .status(400)
      .json({ message: "Please provide a response for the feedback." });
  }
  const contact = await contactModel.findById(contactId);
  if (!contact) {
    res.status(404);
    throw new Error("Contact details not found.");
  }

  try {
    await sendMailResponse(contact.email, response);
    res.status(200).json({ message: "Response sent successfully" });
  } catch {
    res.status(500);
    throw new Error("Mail not sent");
  }
});

// also add controllers for members functionality

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  addUpdates,
  sendMail,
  removeParticipant,
  sendResponse,
};
