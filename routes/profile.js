const express = require("express")
const router = express.Router()

const {
  Profile,
  patientProfileUpdate,
  doctorProfileUpdate,
} = require("../controllers/profile");

router.route("/").get(Profile)
router.route("/update").patch(doctorProfileUpdate).patch(patientProfileUpdate);

module.exports = router