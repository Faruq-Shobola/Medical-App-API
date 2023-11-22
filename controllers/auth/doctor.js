const { admin } = require("../../auth");

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const userResponse = await admin
      .auth()
      .createUser({ email, password, displayName: username });
    res.json(userResponse);
  } catch (error) {
    res.json(error);
  }
};

const login = async (req, res) => {
  try {
    const { idToken } = req.body;
    const userResponse = await admin.auth().verifyIdToken({ idToken });
    res.json(userResponse.uid);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { register, login };
