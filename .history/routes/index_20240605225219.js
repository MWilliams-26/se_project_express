const router = require("express").Router();

const userRouter = require("./users");
const

router.use("/users", userRouter);

module.exports = router;