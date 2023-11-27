const Medication = require("../models/medication");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const { createDailyMedications } = require("../controllers/dailymedication");

const getAllMedications = async (req, res) => {
  const medications = await Medication.find({}).sort("createdAt");
  res.status(200).json({ medications, count: medications.length });
};

const getMedication = async (req, res) => {
  const {
    params: { id: medicationId },
  } = req;

  const medication = await Medication.findOne({
    _id: medicationId,
  });
  if (!medication) {
    res.status(404).json({ message: `No medication with id ${medicationId}` });
  }
  res.status(200).json({ medication });
};

const createMedication = async (req, res) => {
  const { user } = req;

  try {
    // Doctors can create medications for patients
    if (user.userType === "doctor") {
      const doctor = await Doctor.findOne({ email: user.email });
      req.body.createdby = doctor._id;
      // Assuming patientId is sent in the request body
    } else {
      // Patients can create medications for theirself
      const patient = await Patient.findOne({ email: user.email });
      req.body.createdby = patient._id;
      req.body.assignedto = patient._id;
    }

    if (req.body.startdate > req.body.enddate) {
      res.status(422).json({ error: "Invalid medication duration" });
    }

    const medication = await Medication.create(req.body);
    res.status(201).json({ medication });
    createDailyMedications(medication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMedication = async (req, res) => {
  try {
    const { user } = req;

    const {
      params: { id: medicationId },
    } = req;

    const medication = await Medication.findOne({
      _id: medicationId,
    });

    if (!medication) {
      return res
        .status(404)
        .json({ error: `No medication with id ${medicationId}` });
    }

    if (user.userType === "patient") {
      const patient = await Patient.findOne({ email: user.email });
      if (medication.createdby.toString() !== patient._id.toString()) {
        return res
          .status(401)
          .json({ error: "You are not authorized to edit this medication" });
      }
    }

    if (req.body.startdate > req.body.enddate) {
      res.status(422).json({ error: "Invalid medication duration" });
    }

    const updatedMedication = await Medication.findByIdAndUpdate(
      medicationId,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ medication: updatedMedication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMedication = async (req, res) => {
  try {
    const { user } = req;

    const {
      params: { id: medicationId },
    } = req;

    const medication = await Medication.findOne({
      _id: medicationId,
    });

    if (!medication) {
      return res
        .status(404)
        .json({ error: `No medication with id ${medicationId}` });
    }

    if (user.userType === "patient") {
      const patient = await Patient.findOne({ email: user.email });
      if (medication.createdby.toString() !== patient._id.toString()) {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this medication" });
      }
    }
    const removemedication = await Medication.findOneAndDelete({
      _id: medicationId,
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
};
