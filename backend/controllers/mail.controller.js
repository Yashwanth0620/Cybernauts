require("dotenv").config();
const errorHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const announce = errorHandler(async (req, res) => {
  const { mails, notice } = req.body;
  const config = {
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const html = `
    <h1>Cybernauts, CVR College of Engineering</h1>
    <p>${notice}</p>
    `;

  for (const mail of mails) {
    let message = {
      from: process.env.MAIL,
      to: mail,
      subject: "Announcement!!",
      html,
    };

    try {
      await transporter.sendMail(message);
    } catch (error) {
      console.error(`Error sending email to ${mail}:`, error);
    }
  }

  res.status(200).json({ message: "Message sent successfully" });
});

module.exports = { announce };
