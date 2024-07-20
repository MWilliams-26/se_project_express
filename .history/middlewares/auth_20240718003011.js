const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth =
const token = authorization.replace("Bearer ", "");

payload = jwt.verify(token, JWT_SECRET);