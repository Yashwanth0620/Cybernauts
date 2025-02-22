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
    type: Buffer,
  },
  images: [
    {
      type: Buffer,
    },
  ],
  form: {
    type: String,
    required: true,
  },
  participants: [String], // not needed for the frontend form
  organizer: String,
  faculty: [String],
  winners: [
    {
      // not needed for the frontend form
      position: { type: String },
      name: { type: String },
    },
  ],
  cheifGuest: String,
  contributors: [
    {
      roll: { type: String,
        required : true
       },
      description : String,
      image:Buffer,
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
