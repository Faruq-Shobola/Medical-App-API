const { admin } = require("../auth");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

const auth = (req, res, next) => {
  const { userType } = req.body;
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).json({ message: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const payload = admin.verifyIdToken(token);
    if (userType === "doctor") {
      const doctor = Doctor.findOne({ email: payload.email });
      req.user = { ...doctor };
      next();
    } else if (userType === "patient") {
      const patient = Patient.findOne({ email: payload.email });
      req.user = { ...patient };
      next();
    } else {
      res.status(400).json({ error: "Invalid userType" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = auth;
