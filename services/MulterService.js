const multer = require("multer");
const path = require("path");

/** Maximum image count */
const MAX_IMAGE_COUNT = 3;
/** Destination for storing images */
const IMAGE_DESTINATION = "./public/images";

const storage = multer.diskStorage({
  destination: IMAGE_DESTINATION,
  filename: (req, file, cb) => {
    console.log(req.body);
    cb(
      null,
      `${req.body.userId}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const saveFiles = multer({
  storage: storage,
}).array("images", MAX_IMAGE_COUNT);

module.exports = saveFiles;
