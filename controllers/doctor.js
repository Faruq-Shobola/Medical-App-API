const Doctor = require("../models/doctor");


const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find({}).sort("createdAt");
  res.status(200).json({ doctors, count: doctors.length });
};

const getDoctor = async (req, res) => {
  const {
    params: { id: doctorId },
  } = req;

  const doctor = await Doctor.findOne({
    _id: doctorId,
  });
  if (!doctor) {
    res.status(404).json({ message: `No doctor with id ${doctorId}` });
  }
  res.status(200).json({ doctor });
};

module.exports = {
  getAllDoctors,
  getDoctor,
};
