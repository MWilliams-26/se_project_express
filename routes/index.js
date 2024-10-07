const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", clothingItemRouter);
router.post('/signin', login);
router.post('/signup', createUser);
router.use(auth);
router.use("/users", userRouter);



router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Route not found' })
});

module.exports = router;