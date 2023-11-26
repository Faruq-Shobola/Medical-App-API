const cron = require("node-cron");

const dailyMedLogger = cron.schedule("* * * * *", async () => {
  const Medication = require("../Medical-App-API/models/medication");
  const DailyMedication = require("./models/dailymedication");

  const currentDate = new Date();
  console.log(currentDate);
  const medications = await Medication.find({
    startdate: { $lte: currentDate },
    enddate: { $gte: currentDate },
  });
  console.log(medications);

  const dailyMedication = await DailyMedication.create({
    date: currentDate,
    medications: medications.map((medication) => medication._id),
    patient: medications.assignedto,
  });

  console.log("done");
});

module.exports = dailyMedLogger;
