const DailyMedication = require("../models/dailymedications");

const getAllMedications = async (req, res) => {
  if (req.user.userType == "patient") {
    const userId = req.user._id
    const medications = await DailyMedication.find({ patient: userId }).sort(
      "createdAt"
    );
    res.status(200).json({ medications }); 
  } else {
    res.status(401).json({ error: "you are not permitted " });
  }
};


const updateMedication = async (req, res) => {

  if(req.user.userType == 'patient'){
    const {
      user: { _id: userId },
      params: { id: medicationId },
    } = req;
  
    const medication = await DailyMedication.findByIdAndUpdate(
      { _id: medicationId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!medication) {
      res.status(404).json({ error: `No medication with id ${medicationId}` });
    }
    res.status(200).json({ medication });
  } else {
    res.status(401).json({ error: "you are not permitted " });
  }

};


const trackMedication = async (req, res) => {
  if (req.user.userType == "doctor") {
    const patientId = req.params;
    const medications = await DailyMedication.find({ patient: patientId }).sort(
      "createdAt"
    );
    res.status(200).json({ medications });
  } else {
    res.status(401).json({ error: "you are not permitted " });
  }
}

module.exports = {
  getAllMedications,
  updateMedication,
  trackMedication
};
