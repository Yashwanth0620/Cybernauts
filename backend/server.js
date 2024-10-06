const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const {isAuthenticated} = require("./middlewares/authMiddleware")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const adminRoutes = require('./routes/admin.route');
const eventRoutes = require("./routes/event.route");
const memberRoutes = require("./routes/member.route");
const loginRoutes = require("./routes/login.route")
// routing of endpoints
app.use("/admin", isAuthenticated, adminRoutes);
app.use("/events", eventRoutes);
app.use("/members", memberRoutes);
app.use("/auth", loginRoutes);

app.listen(PORT, () => {
    console.log(`Sever listening on port ${PORT}...`);
})
