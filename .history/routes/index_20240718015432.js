const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND_ERROR } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post('/signin', login);
router.post('/signup', createUser);


router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Route not found' })
})

module.exports = router;