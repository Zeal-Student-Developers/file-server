const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

// Use 'public' folder for serving images
app.use("/public", express.static(__dirname + '/public'));

app.use("/image", require("./routes/file"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
