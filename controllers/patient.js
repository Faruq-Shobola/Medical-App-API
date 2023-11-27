const Patient = require("../models/patient");
const Appointment = require("../models/appointment");

const getAllPatients = async (req, res) => {
  const patients = await Patient.find({}).sort("createdAt");
  res.status(200).json({ patients, count: patients.length });
};

const getPatient = async (req, res) => {
  const {
    params: { id: patientId },
  } = req;

  const patient = await Patient.findOne({
    _id: patientId,
  });
  if (!patient) {
    res.status(404).json({ message: `No patient with id ${patientId}` });
  }
  res.status(200).json({ patient });
};

// const getAppointment = async (req, res) => {
//   console.log("it worked")
// };

module.exports = {
  getAllPatients,
  getPatient,
  // getAppointment,
};
