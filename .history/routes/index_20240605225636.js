const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { NOT_FOUND_ERROR } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
.post('/signin', login);
app.post('/signup', createUser);


<<<<<<<< HEAD:.history/routes/index_20240717233504.js
router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Route not found' })
})

========
>>>>>>>> refs/remotes/origin/main:.history/routes/index_20240605225636.js
module.exports = router;