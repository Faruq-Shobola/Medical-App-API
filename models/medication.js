const mongoose = require("mongoose");

const MedicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    note: {
      type: String,
    },
    startdate: {
      type: Date,
      required: [true, "Please provide start date"],
    },
    enddate: {
      type: Date,
    },
    timefrequency: {
      type: String,
      enum: ["day", "afternoon", "night"],
      required: [true, "please provide a frequency"]
    },
    dosage: {
      type: String,
      required: [true, "please provide the dosage"]
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Please provide doctor"],
    },
    assignedto: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
      required: [true, "Please provide patient"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medication", MedicationSchema);
