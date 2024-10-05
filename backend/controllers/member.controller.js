const errorHandler = require("express-async-handler");


// @desc to get all the core body members of particular year
// @API /members/:year
// @access PUBLIC
const getMembers = errorHandler(async (req, res) => {
    
});

module.exports = { getMembers };
