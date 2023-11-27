const express = require("express");
const router = express.Router();

const { profile, profileUpdate } = require("../controllers/profile");

router.route("/").get(profile);
router.route("/update").patch(profileUpdate)

module.exports = router;
