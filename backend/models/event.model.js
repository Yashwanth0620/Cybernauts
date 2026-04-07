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
    required: false,
  },
  organizer: String,
  faculty: [String],
  winners: [
    {
      position: { type: String },
      prizeMoney: { type: String },
      type: { type: String }, // "Team" or "Individual"
      teamSize: { type: Number },
      members: [
        {
          name: { type: String },
          collegename: { type: String },
        },
      ],
    },
  ],
  chiefGuest: [String],
  participants: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      rollNo: { type: String },
      branch: { type: String },
      year: { type: String },
      registeredAt: { type: Date, default: Date.now },
    },
  ],
  contributors: [
    {
      roll: { type: String, required: true },
      contribution: { type: String, required: true },
      image: Buffer,
    },
  ],
  feedbacks: [
    {
      email: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String },
      submittedAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  feedbackEmailSent: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Event", eventSchema);
