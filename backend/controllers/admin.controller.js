const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const errorHandler = require("express-async-handler");
const updatesModel = require("../models/updates.model");
const adminModel = require("../models/admin.model");
const eventModel = require("../models/event.model");
const jwt = require("jsonwebtoken");

const {
  eventUpdateMail,
  updateRejection,
  sendMailResponse,
} = require("./mail.controller");
const contactModel = require("../models/contact.model");

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// initializing drive
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const uploadFileAndGetUrl = async (filePath, type = "image") => {
  try {
    // Upload the file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: `$${type}.jpg`,
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the public URL
    // const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    const fileUrl = `https://drive.google.com/thumbnail?id=${fileId}`;

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw new Error("Failed to upload photos to google drive");
  }
};

const deleteFileFromUrl = async (fileUrl) => {
  try {
    // Extract file ID from the given URL
    const fileIdMatch = fileUrl.match(/id=([a-zA-Z0-9_-]+)/);
    if (!fileIdMatch) {
      throw new Error("Invalid Google Drive file URL");
    }

    const fileId = fileIdMatch[1];

    // Delete the file
    await drive.files.delete({ fileId });
  } catch (error) {
    console.error("Error deleting file:", error.message);
  }
};

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
  console, log(event);
  // Validate required fields
  if (!event.title || !event.startDate || !event.endDate || !event.desc) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  // Validate contributors if they exist
  let contributors = [];
  if (event.contributors) {
    try {
      contributors = JSON.parse(event.contributors);
      if (!Array.isArray(contributors)) {
        res.status(400);
        throw new Error("Invalid contributors format");
      }
    } catch {
      res.status(400);
      throw new Error("Invalid contributors format");
    }
  }

  // Handle optional poster upload
  let posterFile = null;
  if (req.file) {
    try {
      const tempPath = path.join(__dirname, "tempPoster.jpg");
      fs.writeFileSync(tempPath, req.file.buffer);

      // Upload using event ID instead of title
      posterFile = await uploadFileAndGetUrl(tempPath, "poster");

      fs.unlinkSync(tempPath);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to upload event poster");
    }
  }

  faculty = event.faculty.split(",");
  chiefGuest = event.chiefGuest.split(",");

  // Create event object

  const newEvent = {
    ...event,
    faculty,
    chiefGuest,
    contributors,
    poster: posterFile,
  };

  // Save event to database

  try {
    const createdEvent = await eventModel.create(newEvent);
    res
      .status(200)
      .json({ message: "Event added successfully", eventId: createdEvent._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// @desc To update the event details
// @API PUT /admin/events/:id
const updateEvent = errorHandler(async (req, res) => {
  const id = req.params.id;
  const event = await eventModel.findById(id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Extract form data from req.body
  const updatedData = { ...req.body };

  try {
    // Handle poster update (if provided)
    if (req.files && req.files.poster) {
      if (event.poster) {
        await deleteFileFromUrl(event.poster); // Delete previous poster
      }

      const tempPath = path.join(__dirname, "tempPoster.jpg");
      fs.writeFileSync(tempPath, req.files.poster[0].buffer); // Save new poster temporarily

      updatedData.poster = await uploadFileAndGetUrl(id.toString(), tempPath); // Upload new poster
      fs.unlinkSync(tempPath); // Remove temp file
    }

    // Handle images update (if provided)
    if (req.files && req.files.images) {
      if (event.images && event.images.length > 0) {
        await Promise.all(
          event.images.map((imageUrl) => deleteFileFromUrl(imageUrl))
        ); // Delete old images
      }

      const newImageUrls = [];
      for (const image of req.files.images) {
        const tempPath = path.join(__dirname, image.originalname);
        fs.writeFileSync(tempPath, image.buffer); // Save image temporarily

        const uploadedImageUrl = await uploadFileAndGetUrl(tempPath); // Upload image
        newImageUrls.push(uploadedImageUrl);

        fs.unlinkSync(tempPath); // Remove temp file
      }

      updatedData.images = newImageUrls; // Update images in event
    }

    // Convert contributors from string to array if necessary
    if (typeof updatedData.contributors === "string") {
      try {
        updatedData.contributors = JSON.parse(req.body.contributors);
      } catch (error) {
        return res.status(400).json({ message: "Invalid contributors format" });
      }
    }

    // Update only fields that are not null/undefined
    Object.keys(updatedData).forEach((key) => {
      if (
        updatedData[key] === null ||
        updatedData[key] === undefined ||
        updatedData[key] === "" ||
        updatedData[key].length == 0
      ) {
        delete updatedData[key];
      }
    });

    // Update event in DB
    const updatedEvent = await eventModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Returns updated document
      runValidators: true, // Ensures validation rules are applied
    });

    res
      .status(200)
      .json({ message: "Event Updated Successfully", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500);
    throw new Error("Failed to update event");
  }
});

// @desc To delete an event
// @API DELETE /admin/events/:id
const deleteEvent = errorHandler(async (req, res) => {
  const { id } = req.params;
  const event = await eventModel.findByIdAndDelete(id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  if (event.poster) await deleteFileFromUrl(event.poster);
  if (event.images && event.images.length > 0)
    await Promise.all(event.images.map((image) => deleteFileFromUrl(image)));

  res.status(200).json({ message: "Event Deleted Successfully" });
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

const validateAdmin = errorHandler(async (req, res) => {
  if (req.user) {
    return res.json({ role: req.user.role });
  }
  res.json({ role: null });
});

const fetchAdmins = errorHandler(async (req, res) => {
  const users = await adminModel.find({});

  const admins = users.filter((user) => user.role === "admin");
  const superadmins = users.filter((user) => user.role === "superadmin");

  res
    .status(200)
    .json({ message: "Fetched admins successfully", admins, superadmins });
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
  validateAdmin,
  uploadFileAndGetUrl,
  fetchAdmins
};
