const DailyMedication = require("../models/dailymedication");
const Medication = require("../models/medication");

const createDailyMedications = async (id) => {
  try {
    // Fetch all medications from the Medication table
    const medications = await Medication.find({ _id: id });
    console.log(medications);

    // Loop through each medication
    for (const medication of medications) {
      // Calculate the number of days between start and end dates
      const startDate = new Date(medication.startdate);
      const endDate = medication.enddate
        ? new Date(medication.enddate)
        : new Date();
      const daysDifference = Math.floor(
        (endDate - startDate) / (24 * 60 * 60 * 1000)
      );

      // Loop through each day and create a DailyMedication entry
      for (let i = 0; i <= daysDifference; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        // Create DailyMedication entry
        const dailyMedicationEntry = new DailyMedication({
          taken: false,
          date: currentDate,
          medications: medication._id,
          patient: medication.assignedto,
        });

        // Save DailyMedication entry to the database
        await dailyMedicationEntry.save();
      }
    }

    console.log("DailyMedication entries created successfully.");
  } catch (error) {
    console.error("Error creating DailyMedication entries:", error);
  }
};

const getAllMedications = async (req, res) => {
  try {
    const {
      params: { id: patientId },
    } = req;

    const medications = await DailyMedication.find({
      patient: patientId,
    });

    if (!medications) {
      res
        .status(404)
        .json({ message: `No medication with id ${medicationId}` });
    }
    res.status(200).json({ medications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMedication = async (req, res) => {
  if (req.user.userType == "patient") {
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
    res.status(401).json({ error: "you are not permitted" });
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
};

module.exports = {
  getAllMedications,
  updateMedication,
  trackMedication,
  createDailyMedications,
};
