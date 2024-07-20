const app = express();
const express = require("express");

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
