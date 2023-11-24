const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide your last name"],
  },
  email: {
    type: String,
    require: [true, "Please provide your email"],
    unique: true,
  },
  nationality: {
    type: String,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
