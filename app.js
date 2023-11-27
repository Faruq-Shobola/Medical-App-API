require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
// const rateLimiter = require("express-rate-limit");
const connectDB = require("./db/connect");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const app = express();

const authRouter = require("./routes/auth");
const medicationRouter = require("./routes/medication");
const dailyMedicationRouter = require("./routes/dailymedication");
const trackMedicationRouter = require("./routes/trackmedication");
const uploadReportRouter = require("./routes/uploadreport");
const profileRouter = require("./routes/profile");
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const appointmentRouter = require("./routes/appointment");

const authenticateUser = require("./middleware/authentication");
// const dailyMedLogger = require("./cron");

// app.set("trust proxy");
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   })
// );

app.use(express.json());
app.use(cors());
// app.use(helmet());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/patients/", patientRouter);
app.use("/api/v1/doctors/", doctorRouter);
app.use("/api/v1/me/", authenticateUser, profileRouter);
app.use("/api/v1/medications/", authenticateUser, medicationRouter);
app.use("/api/v1/appointments/", authenticateUser, appointmentRouter);
app.use("/api/v1/dailymedications/", authenticateUser, dailyMedicationRouter);
app.use("/api/v1/trackmedications/", authenticateUser, trackMedicationRouter);
app.use("/api/v1/medicalreports/", authenticateUser, uploadReportRouter);

const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });

    // dailyMedLogger.start();
  } catch (error) {
    console.log(error);
  }
};

start();
