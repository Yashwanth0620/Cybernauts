const contactModel = require('../models/contact.model');
const errorHandler = require("express-async-handler");

const sendFeedback = errorHandler(async (req, res) => {
    const { name, desc } = req.body;

    if (!name || !desc) {
        return res.status(400).json({ message: 'Please provide both name and description.' });
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

// @desc Get all contact submissions
// @API GET /admin/contacts
// @access ADMIN
const getContacts = errorHandler(async (req, res) => {
    try {
        const contacts = await contactModel.find({}).sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500);
        throw new Error('An error occurred while fetching contacts.');
    }
});

// @desc Delete a contact submission
// @API DELETE /admin/contacts/:id
// @access ADMIN
const deleteContact = errorHandler(async (req, res) => {
    try {
        const contact = await contactModel.findByIdAndDelete(req.params.id);
        
        if (!contact) {
            res.status(404);
            throw new Error('Contact not found');
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500);
        throw new Error('An error occurred while deleting the contact.');
    }
});

module.exports = { sendFeedback, getContacts, deleteContact };
