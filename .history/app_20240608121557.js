const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);


const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use("/", mainRouter);

app.use((req, res) => {
  req.user = {
    _id: "66610bd742f44b56dc8566e7"
  };
  next();
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
