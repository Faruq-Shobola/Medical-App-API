require("dotenv").config();
const admin = require("firebase-admin");

const credentials = JSON.parse(process.env.FSERVICE);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = { admin };
