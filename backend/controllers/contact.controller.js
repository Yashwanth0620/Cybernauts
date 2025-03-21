const contactModel = require('../models/contact.model');
const errorHandler = require("express-async-handler");

const sendFeedback = errorHandler(async (req, res) => {
    const { name, desc } = req.body;

    if (!name || !desc) {
        return res.status(400).json({ message: 'Please provide both email and description.' });
    }

    const contact = new contactModel({
        name,
        desc
    });

    try {
        await contact.save();
        res.status(201).json({ message: 'Feedback received and will expire in 5 days.', contact });
    } catch (error) {
        res.status(500);
        throw new Error('An error occurred while saving the feedback.');
    }
});

module.exports = { sendFeedback };
