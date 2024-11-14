const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR, UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UNAUTHORIZED_ERROR("User is not logged in");
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    throw new UnauthorizedError("Invalid token");
  }

  req.user = payload;

  return next();
};

module.exports = auth;