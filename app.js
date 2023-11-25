require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const cron = require("node-cron")
const app = express();

const authRouter = require("./routes/auth");
const medicationRouter = require("./routes/medication")

const authenticateUser = require("./middleware/authentication")
const dailyMedLogger = require("./cron")

app.use(express.json());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/medication/", authenticateUser, medicationRouter);


const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });

    dailyMedLogger.start()

  } catch (error) {
    console.log(error);
  }
};

start();
