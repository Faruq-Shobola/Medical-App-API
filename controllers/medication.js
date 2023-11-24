const Mediaction = require("../models/medication");

const getAllMedications = async (req, res) => {
  const medications = await Job.find({}).sort("createdAt");
  res.status(200).json({ medications, count: medications.length });
};

const getMedication = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: medicationId },
  } = req;

  const medication = await Medication.findOne({
    _id: medicationId,
    createdBy: userId,
  });
  if (!medication) {
    res.status(404).json({ message:`No medication with id ${jobId}`});
  }
  res.status(200).json({ medication });
};

const createMedication = async (req, res) => {
  if(req.user.userType != 'doctor'){
    res.status(401).json({ error: "you are not permitted "} )
  } else {
    req.body.createdBy = req.user._id;
    const medication = await Medication.create(req.body);
    res.status(201).json({ medication });
  }
};

// TODO
const updateMedication = async (req, res) => {
  const {
    body: { company, position },
    user: { _id: userId },
    params: { id: medicationId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteMedication = async (req, res) => {
  const {
    user: { _id: userId },
    params: { id: medicationId },
  } = req;

  const medication = await Job.findByIdAndRemove({
    _id: medicationId,
    createdBy: userId,
  });
  if (!medication) {
    res.status(404).json({ error: `No medication with id ${jobId}` });
  }
  res.status(200).send();
};

module.exports = {
  getAllMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
};
