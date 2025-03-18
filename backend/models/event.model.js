const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },

  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  form: {
    type: String,
    required: true,
  },
  organizer: String,
  faculty: [String],
  winners: [
    {
      // not needed for the frontend form
      position: { type: String },
      name: { type: String },
    },
  ],
  chiefGuest: [String],
  contributors: [
    {
      roll: { type: String, required: true },
      contribution: { type: String, required: true },
      image: Buffer,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
