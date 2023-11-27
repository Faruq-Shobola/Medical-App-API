const { admin } = require("../auth");

const auth = (req, res, next) => {
  // const { userType } = req.body;
 
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

        req.user = { sub: payload.sub, email:payload.email, userType: payload.name };
        next()
      
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

module.exports = auth;
