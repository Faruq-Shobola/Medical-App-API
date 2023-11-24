require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();

const authRouter = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/auth/", authRouter);
// app.use("/api/v1/doctor/", doctorAuth);

const port = process.env.port || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
