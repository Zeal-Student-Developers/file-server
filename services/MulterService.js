const multer = require("multer");
const { randomBytes } = require("crypto");
const { extname } = require("path");

/** Maximum image count */
const MAX_IMAGE_COUNT = 3;
/** Destination for storing images */
const IMAGE_DESTINATION = "./public/images";

const storage = multer.diskStorage({
  destination: IMAGE_DESTINATION,
  filename: (req, file, cb) => {
    cb(null, getFileName(file.originalname, req.body.userId));
  },
});

const saveFiles = multer({
  storage: storage,
}).array("images", MAX_IMAGE_COUNT);

/**
 * Generates a randon name for a file using the original name & userID
 * @param {String} filename Original name of the file
 * @param {String} userID ID of the user
 * @returns {String} Randomly generated file name
 */
const getFileName = (filename, userID) => {
  const name = randomBytes(20).toString("hex").substring(0, 20) + userID;

  return name + extname(filename);
};

module.exports = saveFiles;
