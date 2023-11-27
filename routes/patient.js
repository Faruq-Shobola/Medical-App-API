const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getPatient,
} = require("../controllers/patient");

router.route("/").get(getAllPatients);
router.route("/:id").get(getPatient);

module.exports = router;
