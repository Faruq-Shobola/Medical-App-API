const { admin } = require("../auth");
const Patient = require("../models/patient");

const auth = (req, res, next) => {
  const { userType } = req.body;
 
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(400).json({ message: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  admin
    .auth()
    .verifyIdToken(token)
    .then((payload) => {

      if(userType == "patient") {
        req.user = { sub: payload.sub, email:payload.email, userType: "patient" };
        next()
      } else if(userType == "doctor") {
        req.user = { sub: payload.sub, email:payload.email, userType: "doctor" };
        next();
      } else {
        res.status(400).json({ error: "Invalid userType" });
      }
      
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = auth;
