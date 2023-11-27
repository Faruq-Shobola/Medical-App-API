const express = require("express");
const router = express.Router();

const { uploadMedicalReport } = require("../controllers/uploadreport");

router.route("/").post(uploadMedicalReport);

module.exports = router;
