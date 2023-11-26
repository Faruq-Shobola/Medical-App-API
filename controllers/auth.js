const { admin } = require("../auth");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname, userType } = req.body;

    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Create user in MongoDB based on userType
    if (userType === "doctor") {
      const newDoctor = await Doctor.create({
        email,
        firstname,
        lastname,
        // Additional doctor fields
      });
      res.status(201).json({ message: "Signup successful", user: newDoctor });
    } else if (userType === "patient") {
      const newPatient = await Patient.create({
        email,
        firstname,
        lastname,
        // Additional patient fields
      });
      res.status(201).json({ message: "Signup successful", user: newPatient });
    } else {
      res.status(400).json({ error: "Invalid userType" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Sign in with Firebase
    await admin.auth().signInWithEmailAndPassword(email, password);

    // Fetch user from MongoDB based on userType
    let user;
    if (userType === "doctor") {
      user = await Doctor.findOne({ email });
    } else if (userType === "patient") {
      user = await Patient.findOne({ email });
    } else {
      res.status(400).json({ error: "Invalid userType" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { register, login };
