const Appointment = require("../models/appointment");
const Patient = require("../models/patient");

const bookAppointment = async (req, res) => {
  try {
    const { user } = req;

    if (user.userType !== "patient") {
      return res
        .status(401)
        .json({ error: "You are not authorized to edit this medication" });
    }

    const patient = await Patient.findOne({ email: user.email });
    req.body.patient = patient._id;

    if (!patient) {
      res.status(404).json({ error: `No Patient with id ${medicationId}` });
    }

    const appointment = await Appointment.create(req.body);
    res.status(201).json({ appointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { user } = req;

    const {
      params: { id: appointmentId },
    } = req;

    if (user.userType !== "patient") {
      return res
        .status(401)
        .json({ error: "You are not authorized to edit this medication" });
    }

    const patient = await Patient.findOne({ email: user.email });
    req.body.patient = patient._id;

    if (!patient) {
      res.status(404).json({ error: `No Patient with id ${medicationId}` });
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      patient: patient._id,
    });
    if (!appointment) {
      res
        .status(401)
        .json({ error: `you are not authorized to edit this appointment` });
    }

    const updateAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ appointment: updateAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { bookAppointment, updateAppointment };
