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
        .json({ message: `No medication is assigned to id ${patientId}` });
    }
    res.status(200).json({ medications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMedication = async (req, res) => {
  try {
    const { user } = req;
    const {
      params: { id: medicationId },
    } = req;

    if (user.userType !== "patient") {
      return res
        .status(401)
        .json({ error: "You are not authorized to edit this medication" });
    }

    const medication = await DailyMedication.findOne({
      _id: medicationId,
    });

    if (!medication) {
      return res
        .status(404)
        .json({ error: `No medication with id ${medicationId}` });
    }

    // Update the medication
    const updatedMedication = await DailyMedication.findByIdAndUpdate(
      { _id: medicationId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMedication) {
      return res
        .status(404)
        .json({ error: `No medication with id ${medicationId}` });
    }

    res.status(200).json({ medication: updatedMedication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const trackMedication = async (req, res) => {
  try {

    const {
      params: { id: patientId },
    } = req;

    
    const medication = await DailyMedication.find({
      patient: patientId,
    });

    if (!medication) {
      return res
        .status(404)
        .json({ error: `No patient with id ${medicationId}` });
    }

    res.status(200).json({ medication: medication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMedications,
  updateMedication,
  trackMedication,
  createDailyMedications,
};
