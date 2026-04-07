const errorHandler = require("express-async-handler");
const eventModel = require("../models/event.model");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configuration for email transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
    },
});

// @desc Send feedback request emails to all participants
// @route POST /api/feedback/:id/request
// @access Private (Admin)
const sendFeedbackRequest = errorHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await eventModel.findById(eventId);

    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    // Only allow feedback for completed events (optional constraint, but good practice)
    // const now = new Date();
    // if (new Date(event.endDate) > now) {
    //   res.status(400);
    //   throw new Error("Event is not yet completed.");
    // }

    if (!event.participants || event.participants.length === 0) {
        res.status(400);
        throw new Error("No participants found for this event");
    }

    const feedbackLink = `${process.env.FRONTEND_URI || 'http://localhost:3000'}/events/${eventId}/feedback`;
    let sentCount = 0;
    let errorCount = 0;

    for (const participant of event.participants) {
        if (participant.email) {
            const mailOptions = {
                from: process.env.MAIL,
                to: participant.email,
                subject: `We'd love your feedback on ${event.title}`,
                html: `
          <p>Dear ${participant.name},</p>
          <p>Thank you for attending <strong>${event.title}</strong>.</p>
          <p>We value your opinion and would love to hear your thoughts!</p>
          <p>Please take a moment to rate the event and leave a comment:</p>
          <a href="${feedbackLink}" style="display: inline-block; padding: 10px 20px; background-color: #162978; color: white; text-decoration: none; border-radius: 5px;">Give Feedback</a>
          <p>Or click here: <a href="${feedbackLink}">${feedbackLink}</a></p>
          <br/>
          <p>Best Regards,</p>
          <p>${event.organizer || "Cybernauts Team"}</p>
        `,
            };

            try {
                await transporter.sendMail(mailOptions);
                sentCount++;
            } catch (error) {
                console.error(`Failed to send feedback email to ${participant.email}:`, error);
                errorCount++;
            }
        }
    }

    res.status(200).json({
        message: `Feedback requests sent. Success: ${sentCount}, Failed: ${errorCount}`,
        sentCount,
        errorCount,
    });
});

// @desc Submit feedback for an event
// @route POST /api/feedback/:id/submit
// @access Public
const submitFeedback = errorHandler(async (req, res) => {
    const eventId = req.params.id;
    const { email, rating, comment } = req.body;

    if (!email || !rating) {
        res.status(400);
        throw new Error("Email and rating are required");
    }

    const event = await eventModel.findById(eventId);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    // 1. Check if user is a registered participant
    const isParticipant = event.participants.some(
        (p) => p.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!isParticipant) {
        res.status(403);
        throw new Error("You must be a registered participant to provide feedback.");
    }

    // 2. Check for duplicate submissions
    const alreadySubmitted = event.feedbacks.some(
        (f) => f.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (alreadySubmitted) {
        res.status(400); // Or 409 Conflict
        throw new Error("You have already submitted feedback for this event.");
    }

    // 3. Add feedback
    const newFeedback = {
        email: email.trim(),
        rating: Number(rating),
        comment: comment || "",
    };

    event.feedbacks.push(newFeedback);

    // 4. Calculate new average rating
    const totalRating = event.feedbacks.reduce((sum, item) => sum + item.rating, 0);
    event.averageRating = totalRating / event.feedbacks.length;

    await event.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
});

// Automated feedback method
const sendAutomatedFeedbackRequests = async () => {
    try {
        const now = new Date();
        const events = await eventModel.find({
            feedbackEmailSent: false
        });

        for (const event of events) {
            // Calculate actual end datetime including time
            const endDate = new Date(event.endDate);
            if (event.endTime) {
                const [hours, minutes] = event.endTime.split(':').map(Number);
                endDate.setHours(hours, minutes, 0, 0);
            } else {
                endDate.setHours(23, 59, 59, 999);
            }

            if (endDate >= now) continue; // Event is not completed yet

            // If completed but no participants, just mark as sent
            if (!event.participants || event.participants.length === 0) {
                event.feedbackEmailSent = true;
                await event.save();
                continue;
            }

            const feedbackLink = `${process.env.FRONTEND_URI || 'http://localhost:3000'}/events/${event._id}/feedback`;

            for (const participant of event.participants) {
                if (participant.email) {
                    const mailOptions = {
                        from: process.env.MAIL,
                        to: participant.email,
                        subject: `We'd love your feedback on ${event.title}`,
                        html: `
                          <p>Dear ${participant.name},</p>
                          <p>Thank you for attending <strong>${event.title}</strong>.</p>
                          <p>We value your opinion and would love to hear your thoughts!</p>
                          <p>Please take a moment to rate the event and leave a comment:</p>
                          <a href="${feedbackLink}" style="display: inline-block; padding: 10px 20px; background-color: #162978; color: white; text-decoration: none; border-radius: 5px;">Give Feedback</a>
                          <p>Or click here: <a href="${feedbackLink}">${feedbackLink}</a></p>
                          <br/>
                          <p>Best Regards,</p>
                          <p>${event.organizer || "Cybernauts Team"}</p>
                        `,
                    };
                    try {
                        await transporter.sendMail(mailOptions);
                    } catch (err) {
                        console.error("Failed automated feedback send to:", participant.email, err);
                    }
                }
            }

            event.feedbackEmailSent = true;
            await event.save();
        }
    } catch (error) {
        console.error("Error running automated feedback requests:", error);
    }
};

module.exports = { sendFeedbackRequest, submitFeedback, sendAutomatedFeedbackRequests };
