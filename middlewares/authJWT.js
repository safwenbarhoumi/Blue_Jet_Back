const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
require("dotenv").config();

function authJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401); //unauthorized
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.sendStatus(403); // Forbidden
    }
    req.userId = decoded.userId;
    next();
  });
}

// const authJwt = {
//   authenticateToken,
// };

module.exports = authJWT;
