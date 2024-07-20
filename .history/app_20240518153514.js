const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log("connected to DB");
  })
  .catch

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
