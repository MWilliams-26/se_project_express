const express = require("express");
const mongoose = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
