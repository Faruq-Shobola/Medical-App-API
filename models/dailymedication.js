const mongoose = require("mongoose");

const dailyMedicationSchema = new mongoose.Schema(
  {
    taken: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
    },
    dosage: {
      type: String,
      required: [true, "please provide the dosage"]
    },
    medications: {
      type: mongoose.Types.ObjectId,
      ref: "Medication",
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "Patient",
    },
  },
  { timestamps: true }
);

const DailyMedication = mongoose.model("DailyMedication", dailyMedicationSchema);

module.exports = DailyMedication;