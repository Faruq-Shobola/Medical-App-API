const express = require("express");
const router = express.Router();

const {
  getAllMedications,
  updateMedication,
} = require("../controllers/dailymedication");

router.route("/").get(getAllMedications)
router.route("/:id").patch(updateMedication);

module.exports = router;
