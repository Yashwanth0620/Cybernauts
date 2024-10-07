const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            return next(); // Exit function after successful verification
        });
    } 
    
    if (!token) {
        res.status(401);
        throw new Error("Unauthorized user");
    }
});

module.exports = { isAuthenticated };
