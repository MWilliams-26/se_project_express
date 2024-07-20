const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let 
  payload = jwt.verify(token, JWT_SECRET);
}