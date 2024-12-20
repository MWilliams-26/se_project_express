const router = require("express").Router();
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../utils/errors/NotFoundError");
const { validateLogin, validateCreateUser } = require("../middlewares/validation");

router.use("/items", clothingItemRouter);
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);
router.use(auth);
router.use("/users", userRouter);



router.use(() => {
  throw new NotFoundError("Requested resource not found");
});

module.exports = router;