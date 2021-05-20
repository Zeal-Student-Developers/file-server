const router = require("express").Router();

const { saveImagesController } = require("../controllers/FileController");

// Route to store images
router.post("/", saveImagesController);

module.exports = router;
