const Patient = require("../models/patient");
const Doctor = require("../models/doctor");

const profile = async (req, res) => {
  const { user } = req;

  if (user.userType == "patient") {
    const me = await Patient.findOne({ email: user.email });
    res.status(200).json(me);
  } else if (user.userType == "doctor") {
    const me = await Doctor.findOne({ email: user.email });
    res.status(200).json(me);
  }
};

const profileUpdate = async (req, res) => {
  const { user } = req;

  if (user.userType == "patient") {

    const profileId = await Patient.findOne({
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

  } else if(user.userType == "doctor") {

     const profileId = await Doctor.findOne({
       email: user.email,
     });

     if (!profileId) {
       res.status(404).json({ error: `this account does not exists` });
     }

     const profile = await Doctor.findByIdAndUpdate(profileId, req.body, {
       new: true,
       runValidators: true,
     });

     res.status(200).json({ profile }); 

  }

};


module.exports = {
  profile,
  profileUpdate,
};
