const express = require("express");
const router = express.Router();

const { trackMedication } = require("../controllers/dailymedication");

router.route("/:id").get(trackMedication);

module.exports = router;
