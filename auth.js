require("dotenv").config();
const admin = require("firebase-admin");

const credentials = JSON.parse(process.env.FSERVICE);

console.log(credentials)
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

module.exports = { admin };
