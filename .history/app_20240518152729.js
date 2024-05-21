const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
const { PORT = 3001 } = process.env;

mongoose

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
