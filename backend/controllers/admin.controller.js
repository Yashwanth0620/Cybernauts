const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const errorHandler = require("express-async-handler");
const updatesModel = require("../models/updates.model");
const adminModel = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const eventModel = require("../models/event.model");
const jwt = require("jsonwebtoken");
const ExcelJS = require("exceljs");

const {
  deleteFileFromUrl,
  uploadFileAndGetUrl,
} = require("./drive.controller");

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
  // Validate required fields
  if (!event.title || !event.startDate || !event.endDate || !event.desc) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  // Handle optional poster upload
  let posterFile = null;

  const logPath = path.join(__dirname, "..", "debug.log");
  fs.appendFileSync(logPath, `[AddEvent] Request received. Has file: ${!!req.file}\n`);

  if (req.file) {
    try {
      const tempPath = path.join(__dirname, "tempPoster.jpg");
      fs.writeFileSync(tempPath, req.file.buffer);

      fs.appendFileSync(logPath, `[AddEvent] Uploading poster...\n`);
      // Upload using event ID instead of title
      posterFile = await uploadFileAndGetUrl(tempPath, "poster");
      fs.appendFileSync(logPath, `[AddEvent] Poster uploaded: ${posterFile}\n`);

      // Clean up temp file
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }

      // If upload failed but didn't throw, log warning
      if (!posterFile) {
        console.warn("Poster upload returned null/undefined, continuing without poster");
      }
    } catch (error) {
      console.error("Error uploading poster:", error);
      // Don't fail the entire event creation if poster upload fails
      // Just log the error and continue without poster
      if (fs.existsSync(path.join(__dirname, "tempPoster.jpg"))) {
        try {
          fs.unlinkSync(path.join(__dirname, "tempPoster.jpg"));
        } catch (unlinkError) {
          console.error("Error deleting temp file:", unlinkError);
        }
      }
      // Continue without poster - don't throw error
    }
  }

  // Handle faculty and chiefGuest - split if they exist
  let faculty = [];
  if (event.faculty && typeof event.faculty === 'string' && event.faculty.trim() !== '') {
    faculty = event.faculty.split(",").map(f => f.trim()).filter(f => f);
  } else if (Array.isArray(event.faculty)) {
    faculty = event.faculty;
  }

  let chiefGuest = [];
  if (event.chiefGuest && typeof event.chiefGuest === 'string' && event.chiefGuest.trim() !== '') {
    chiefGuest = event.chiefGuest.split(",").map(c => c.trim()).filter(c => c);
  } else if (Array.isArray(event.chiefGuest)) {
    chiefGuest = event.chiefGuest;
  }

  // Create event object
  const newEvent = {
    ...event,
    faculty,
    chiefGuest,
    poster: posterFile || event.poster || "",
  };

  // Save event to database
  try {
    const createdEvent = await eventModel.create(newEvent);
    res
      .status(200)
      .json({ message: "Event added successfully", eventId: createdEvent._id });
  } catch (err) {
    console.error("Error creating event:", err);
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message).join(', ');
      res.status(400).json({ message: `Validation error: ${errors}`, error: err.message });
    } else {
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  }
});

// @desc To update the event details
// @API PUT /admin/events/:id
const updateEvent = errorHandler(async (req, res) => {
  const id = req.params.id;
  const logPath = path.join(__dirname, "..", "debug.log");
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] Update Event Request ID: ${id}\n`);

  const event = await eventModel.findById(id);

  if (!event) {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] Event not found for ID: ${id}\n`);
    res.status(404);
    throw new Error("Event not found");
  }

  // Extract form data from req.body
  const updatedData = { ...req.body };

  try {
    // Handle poster update (if provided)
    if (req.files && req.files.poster) {
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] Processing new poster upload...\n`);
      if (event.poster) {
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] Deleting old poster: ${event.poster}\n`);
        await deleteFileFromUrl(event.poster); // Delete previous poster
      }

      const tempPath = path.join(__dirname, "tempPoster.jpg");
      fs.writeFileSync(tempPath, req.files.poster[0].buffer); // Save new poster temporarily

      fs.appendFileSync(logPath, `[${new Date().toISOString()}] Uploading new poster...\n`);
      updatedData.poster = await uploadFileAndGetUrl(tempPath, "poster"); // Upload new poster
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] New poster URL: ${updatedData.poster}\n`);

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
    const logPath = path.join(__dirname, "..", "debug.log");
    const logMessage = `[${new Date().toISOString()}] Error updating event: ${error.message}\nStack: ${error.stack}\n\n`;
    fs.appendFileSync(logPath, logMessage);

    console.error("Error updating event:", error);
    res.status(500);
    throw new Error(`Failed to update event: ${error.message}`);
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
  res.status(200).json({ success: true, message: "update added successfully" });
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

const updateAdmin = errorHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  if (updates.password.length === 0) delete updates.password;
  else {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }

  // Find the existing admin
  let admin = await adminModel.findById(id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  // Update only the provided fields
  Object.keys(updates).forEach((key) => {
    if (updates[key] !== undefined) {
      admin[key] = updates[key];
    }
  });

  // Save the updated admin
  await admin.save();

  res.status(200).json({ message: "Admin updated successfully", admin });
});

const deleteAdmin = errorHandler(async (req, res) => {
  const { id } = req.params;

  // Find the existing admin
  const admin = await adminModel.findById(id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  // Delete the admin
  await adminModel.findByIdAndDelete(id);

  res.status(200).json({ message: "Admin deleted successfully" });
});

// @desc Export event registrations to Excel
// @API GET /admin/events/:id/export
// @access ADMIN
const exportEventRegistrations = errorHandler(async (req, res) => {
  const { id } = req.params;

  const event = await eventModel.findById(id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`${event.title} - Registrations`);

  // Add event info at the top
  worksheet.addRow([`Event: ${event.title}`]);
  worksheet.addRow([`Type: ${event.type || "N/A"}`]);
  worksheet.addRow([`Date: ${new Date(event.startDate).toLocaleDateString()}`]);
  worksheet.addRow([`Total Registrations: ${event.participants?.length || 0}`]);
  worksheet.addRow([]); // Empty row

  // Define columns and add header
  worksheet.columns = [
    { header: "S.No", key: "sno", width: 10 },
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 35 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Roll Number", key: "rollNo", width: 15 },
    { header: "Branch", key: "branch", width: 15 },
    { header: "Year", key: "year", width: 10 },
    { header: "Registered At", key: "registeredAt", width: 20 },
  ];

  // Style the header row (row 6 after info rows)
  const headerRow = worksheet.getRow(6);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFD3D3D3" },
  };

  // Add participants data
  if (event.participants && event.participants.length > 0) {
    event.participants.forEach((participant, index) => {
      worksheet.addRow({
        sno: index + 1,
        name: participant.name || "",
        email: participant.email || "",
        phone: participant.phone || "",
        rollNo: participant.rollNo || "",
        branch: participant.branch || "",
        year: participant.year || "",
        registeredAt: participant.registeredAt
          ? new Date(participant.registeredAt).toLocaleString()
          : "",
      });
    });
  } else {
    worksheet.addRow({
      sno: "-",
      name: "No registrations yet",
      email: "",
      phone: "",
      rollNo: "",
      branch: "",
      year: "",
      registeredAt: "",
    });
  }

  // Set the filename
  const fileName = `${event.title.replace(/[^a-z0-9]/gi, "_")}_registrations_${Date.now()}.xlsx`;

  // Set response headers
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${fileName}"`
  );

  // Write to response
  await workbook.xlsx.write(res);
  res.end();
});

// @desc Add a winner to an event
// @API POST /admin/events/:id/winners
const addWinner = errorHandler(async (req, res) => {
  const { id } = req.params;
  const winnerData = req.body; // Expects { position, prizeMoney, type, teamSize, members }

  const logPath = path.join(__dirname, "..", "debug.log");
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] AddWinner Request. EventID: ${id}\nData: ${JSON.stringify(winnerData)}\n`);

  try {
    const event = await eventModel.findById(id);
    if (!event) {
      fs.appendFileSync(logPath, `[${new Date().toISOString()}] Event not found: ${id}\n`);
      res.status(404);
      throw new Error("Event not found");
    }

    event.winners.push(winnerData);
    await event.save();
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] Winner added successfully.\n`);

    res.status(200).json({ message: "Winner added successfully", event });
  } catch (error) {
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] Error in addWinner: ${error.message}\n`);
    res.status(500);
    throw error;
  }
});



// also add controllers for members functionality

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  addUpdates,
  updateAdmin,
  deleteAdmin,
  sendMail,
  removeParticipant,
  sendResponse,
  validateAdmin,
  uploadFileAndGetUrl,
  fetchAdmins,
  exportEventRegistrations,
  addWinner,
};
