const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const eventModel = require("../models/event.model");
const errorHandler = require("express-async-handler");
require("dotenv").config();

// Configuration for email transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS,
    },
});

// Helper function to generate Certificate PDF
const generateCertificate = (participantName, eventName, date, facultyName) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            layout: "landscape",
            size: "A4",
        });

        const buffers = [];
        doc.on("data", (buffers.push.bind(buffers)));
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });

        // --- Certificate Design ---

        // 1. Border
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40)
            .stroke("#162978"); // Dark Blue Border

        doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50)
            .lineWidth(3)
            .stroke("#dff4f3"); // Light Blue Inner Border

        // 2. Header
        doc.fontSize(40).fillColor("#162978").text("CERTIFICATE", 0, 100, {
            align: "center",
            underline: false
        });

        doc.fontSize(25).fillColor("#333").text("OF PARTICIPATION", 0, 150, {
            align: "center"
        });

        // 3. Body Text
        doc.moveDown();
        doc.fontSize(15).fillColor("#555").text("This is to certify that", 0, 220, {
            align: "center",
        });

        // 4. Participant Name
        doc.moveDown();
        doc.fontSize(35).fillColor("#000").font("Times-BoldItalic").text(participantName, 0, 250, {
            align: "center",
        });

        // Reset font
        doc.font("Helvetica");

        // 5. Event Details
        doc.moveDown();
        doc.fontSize(15).fillColor("#555").text("has successfully participated in the event", 0, 310, {
            align: "center",
        });

        doc.moveDown();
        doc.fontSize(25).fillColor("#162978").font("Times-Bold").text(eventName, 0, 340, {
            align: "center",
        });

        // Reset font
        doc.font("Helvetica");

        doc.moveDown();
        doc.fontSize(15).fillColor("#555").text(`held on ${date}`, 0, 380, {
            align: "center",
        });

        // 6. Signatures
        const signatureY = 480;
        const leftSignX = 100;
        const rightSignX = doc.page.width - 300;

        // Faculty Signature (Left)
        doc.lineWidth(1).moveTo(leftSignX, signatureY).lineTo(leftSignX + 200, signatureY).stroke();
        doc.fontSize(14).font("Times-Bold").text(facultyName || "Faculty Coordinator", leftSignX, signatureY + 10, {
            align: "center", width: 200
        });
        doc.fontSize(10).font("Helvetica").text("Faculty Coordinator", leftSignX, signatureY + 30, {
            align: "center", width: 200
        });

        // Principal Signature (Right)
        doc.lineWidth(1).moveTo(rightSignX, signatureY).lineTo(rightSignX + 200, signatureY).stroke();
        doc.fontSize(14).font("Times-Bold").text("Dr. C. Rammohan Reddy", rightSignX, signatureY + 10, {
            align: "center", width: 200
        });
        doc.fontSize(10).font("Helvetica").text("Principal", rightSignX, signatureY + 30, {
            align: "center", width: 200
        });

        // Finalize PDF file
        doc.end();
    });
};

// @desc Generate and send certificates to all participants of an event
// @route POST /api/certificate/:id
// @access Private (Admin)
const sendCertificates = errorHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await eventModel.findById(eventId);

    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    if (!event.participants || event.participants.length === 0) {
        res.status(400);
        throw new Error("No participants found for this event");
    }

    const eventDate = new Date(event.startDate).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
    const facultyName = event.faculty && event.faculty.length > 0 ? event.faculty[0] : "Faculty Coordinator";

    let sentCount = 0;
    let errorCount = 0;

    // Process each participant
    for (const participant of event.participants) {
        if (participant.email) {
            try {
                const pdfBuffer = await generateCertificate(participant.name, event.title, eventDate, facultyName);

                const mailOptions = {
                    from: process.env.MAIL,
                    to: participant.email,
                    subject: `Certificate of Participation - ${event.title}`,
                    html: `
                    <p>Dear ${participant.name},</p>
                    <p>Thank you for participating in <strong>${event.title}</strong> held on ${eventDate}.</p>
                    <p>Please find your certificate attached.</p>
                    <br/>
                    <p>Best Regards,</p>
                    <p>${event.organizer || "Cybernauts Team"}</p>
                `,
                    attachments: [
                        {
                            filename: `${participant.name}_Certificate.pdf`,
                            content: pdfBuffer,
                            contentType: 'application/pdf'
                        }
                    ]
                };

                await transporter.sendMail(mailOptions);
                sentCount++;
                console.log(`Certificate sent to ${participant.email}`);

            } catch (error) {
                console.error(`Failed to send certificate to ${participant.email}:`, error);
                errorCount++;
            }
        }
    }

    res.status(200).json({
        message: `Process completed. Sent: ${sentCount}, Failed: ${errorCount}`,
        sentCount,
        errorCount
    });
});

module.exports = { sendCertificates };
