const express = require("express");
const router = express.Router();

const { bookAppointment, updateAppointment } = require("../controllers/appointment");

router.route("/").post(bookAppointment);
router.route("/:id").patch(updateAppointment);

module.exports = router;
