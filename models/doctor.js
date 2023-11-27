const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
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
  about: {
    type: String,
  },
  mobile: {
    type: String,
  },
  Address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  nationality: {
    type: String,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
