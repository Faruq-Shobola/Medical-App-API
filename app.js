require("dotenv").config();
const express = require("express");
const app = express();

const { patientAuth, doctorAuth } = require("./routes");

app.use(express.json());

app.use("/api/v1/patient/", patientAuth);
app.use("/api/v1/doctor/", doctorAuth);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
