const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const routes = require("./routes");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);
<<<<<<<< HEAD:.history/app_20240718012058.js
  
========

  app.use((req, res, next) => {
    req.user = {
      _id: "66610bd742f44b56dc8566e7"
    };
    next();
  });
>>>>>>>> refs/remotes/origin/main:.history/app_20240608225121.js



app.use(express.json());
app.use(routes);
app.use("/", mainRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
