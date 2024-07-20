const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR } = require("../utils/errors");


const token = authorization.replace("Bearer ", "");

payload = jwt.verify(token, JWT_SECRET);