require("dotenv").config();
const admin = require("firebase-admin");

const credentials = require(`./${process.env.FSERVICE}`);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = { admin };