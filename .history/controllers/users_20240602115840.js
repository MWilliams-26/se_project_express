const User = require("../models/user");

//GET /users//

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};