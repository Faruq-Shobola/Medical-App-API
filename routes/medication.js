const express = require("express");
const router = express.Router();

const {
  getAllMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
} = require("../controllers/medication");

router.route("/").post(createMedication).get(getAllMedications);
router.route("/:id").get(getMedication).delete(deleteMedication).patch(updateMedication);

module.exports = router;
