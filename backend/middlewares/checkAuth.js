const jwt = require("jsonwebtoken");
const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "ioidzjdihzhih251");

    next();
  } catch {
    res.status(401).json({ message: "not authorizid" });
  }
};

module.exports = checkAuth;
