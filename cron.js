const cron = require("node-cron");

const dailyMedLogger = cron.schedule("* * * * *", () => {
  const Medication = require("../models/medication");
  const DailyMedication = require("../models/dailymedications");

    const currentDate = new Date();

    const medications = Medication.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    const dailyMedication = DailyMedication.create({
      date: currentDate,
      medications: medications.map((medication) => medication._id),
    });

  console.log("done");
});

module.exports = dailyMedLogger;
