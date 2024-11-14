const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("User is not logged in"));
  }
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error(err);
    return next(new UnauthorizedError("Invalid token"));
  }

  req.user = payload;

  return next();
};

module.exports = auth;