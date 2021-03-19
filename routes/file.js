const router = require("express").Router();

const saveImages = require("../services/MulterService");
const { saveImagesController } = require("../controllers/FileController");

// Route to store images
router.post("/", saveImages, saveImagesController);

module.exports = router;
