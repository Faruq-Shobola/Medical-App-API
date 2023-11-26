const express = require("express");
const router = express.Router();

const {
  getAllMedications,
  updateMedication,
} = require("../controllers/dailymedication");

router.route("/:id").get(getAllMedications).patch(updateMedication);

module.exports = router;
