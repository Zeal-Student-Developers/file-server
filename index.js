const express = require("express");

const app = express();

app.use(express.json());

// Use 'public' folder for serving images
app.use("/public/images", express.static("public"));

app.use("/image", require("./routes/file"));

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
