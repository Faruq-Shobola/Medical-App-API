const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

const Profile = async (req, res) => {
  const { user } = req;

  if (user.userType == "patient") {
    const me = await Patient.findOne({ email: user.email });
    res.status(200).json(me);
  } else if (user.userType == "doctor") {
    const me = await Doctor.findOne({ email: user.email });
    res.status(200).json(me);
  }
};

const patientProfileUpdate = async (req, res) => {
  const { user } = req;

  if (user.userType !== "patient") {
    res
      .status(401)
      .json({ error: "You are not authorized to edit this information" });
  }
  console.log(user)

  const profileId = Patient.findOne({
    email: user.email
  });

  if(!profileId) {
    res.status(404).json({error: `this account does not exists`})
  }

  const profile = await Patient.findByIdAndUpdate(
    profileId,
    req.body,
    { new: true, runValidators: true }
  )

  res.status(200).json({profile})

};

const doctorProfileUpdate = async (req, res) => {};

module.exports = {
  Profile,
  patientProfileUpdate,
  doctorProfileUpdate,
};
