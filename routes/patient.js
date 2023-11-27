const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatient,
  // getAppointment,
} = require("../controllers/patient");

router.route("/").get(getAllPatients);
router.route("/:id").get(getPatient);
// router.route("/appointments").get(getAppointment);

module.exports = router;
