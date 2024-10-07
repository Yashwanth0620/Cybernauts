const errorHandler = require("express-async-handler");

const eventUpdateMail = errorHandler(async (req, res, mails) => {

});

const updateRejection = errorHandler(async (req, res, mail) => {

});

const sendResponse = errorHandler(async (req, res, mail, text) => {

})

module.exports = { eventUpdateMail, updateRejection, sendResponse };
