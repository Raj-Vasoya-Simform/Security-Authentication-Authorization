const jwt = require("jsonwebtoken");

const SECRET_KEY = "NOTES@_API";

exports.auth = (req, res, next) => {
  try {
    let = token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized user." });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized user." });
  }
};

exports.isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.json({ message: "Session Not Found." });
  }
};

// module.exports = auth;
