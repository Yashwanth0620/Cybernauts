const errorHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const eventUpdateMail = errorHandler(async (mails, notice) => {
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
    `
    mails.forEach(async mail => {
        let message = {
            from: process.env.MAIL,
            to: mail,
            subject: "Event registration update",
            html // Attach the generated HTML content
        };
        
        try {
            await transporter.sendMail(message);
        } catch (error) {
            console.error("Error sending OTP email:", error);
            throw error; // Handle this error appropriately in your calling function
        }
    });
});

const updateRejection = errorHandler(async (mail) => {
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
    <p>We are sorry to inform that you have been rejected from the event that you recently registered for</p>
    `
    
    // Define the message details
    let message = {
        from: process.env.MAIL,
        to: mail,
        subject: "Event registration update",
        html // Attach the generated HTML content
    };
    
    try {
        await transporter.sendMail(message);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error; // Handle this error appropriately in your calling function
    }
});

const sendMailResponse = errorHandler(async (mail, text) => {
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
    <p>${text}</p>
    `
    
    // Define the message details
    let message = {
        from: process.env.MAIL,
        to: mail,
        subject: "Response for you feedback",
        html // Attach the generated HTML content
    };
    
    try {
        await transporter.sendMail(message);
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error; // Handle this error appropriately in your calling function
    }
});

module.exports = { eventUpdateMail, updateRejection, sendMailResponse };
