const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateLogin, validateCreateUser } = require("../middlewares/validation");

router.use("/items", clothingItemRouter);
router.post('/signin', auth, validateLogin, login);
router.post('/signup', auth, validateCreateUser, createUser);
router.use(auth);
router.use("/users", userRouter);



router.use(() => {
  throw new NOT_FOUND_ERROR("Requested resource not found");
});

module.exports = router;