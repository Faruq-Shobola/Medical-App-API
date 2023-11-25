const Medication = require("../models/medication");
const DailyMedication = require("../models/dailymedications");

const getAllMedications = async (req, res) => {
  const medications = await Medication.find({}).sort("createdAt");
  res.status(200).json({ medications, count: medications.length });
};

const getMedication = async (req, res) => {
  const {
    params: { id: medicationId },
  } = req;

  const medication = await Medication.findOne({
    _id: medicationId
  });
  if (!medication) {
    res.status(404).json({ message:`No medication with id ${medicationId}`});
  }
  res.status(200).json({ medication });
};

const createMedication = async (req, res) => {
  
  if(req.user.userType != 'doctor'){
    res.status(401).json({ error: "you are not permitted "} )
  } 

  req.body.createdBy = req.user._id;
  const medication = await Medication.create(req.body);
  res.status(201).json({ medication });
  
};

const updateMedication = async (req, res) => {

  if(req.user.userType != 'doctor'){
    res.status(401).json({ error: "you are not permitted "} )
  }

  const {
    body: { name, startdate, },
    user: { _id: userId },
    params: { id: medicationId },
  } = req;

  if (name === "" || startdate === "") {
    res.status(400).json({error: "Company or position fields cannot be empty"});
  }
  const medication = await Medication.findByIdAndUpdate(
    { _id: medicationId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!medication) {
    res.status(404).json({ error: `No medication with id ${medicationId}` });
  }
  res.status(200).json({ medication });
  

};

const deleteMedication = async (req, res) => {

  if(req.user.userType != 'doctor'){
    res.status(401).json({ error: "you are not permitted "} )
  } 

  const {
    user: { _id: userId },
    params: { id: medicationId },
  } = req;


  const medication = await Medication.findByIdAndRemove({
    _id: medicationId,
    createdBy: userId,
  });
  if (!medication) {
    res.status(404).json({ error: `No medication with id ${medicationId}` });
  }
  res.status(200).send();

};


const trackMedication = async () => {
  try {
    const { user } = req;

    

    


    return res.status(200).json({ medications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
};
