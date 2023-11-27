const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: [true, "please provide the dosage"],
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      enum: ["approved", "pending", "decline"],
      default: "pending"
    },
  },
  { timestamps: true }
);

const appointment = mongoose.model(
  "appointment",
  appointmentSchema
);

module.exports = appointment;
