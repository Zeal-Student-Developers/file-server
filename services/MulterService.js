const multer = require("multer");
const { randomBytes } = require("crypto");
const { extname } = require("path");

/** Maximum image count */
const MAX_IMAGE_COUNT = 3;
/** Destination for storing images */
const IMAGE_DESTINATION = "./public/images";

const storage = multer.diskStorage({
  destination: IMAGE_DESTINATION,
  filename: ({ body }, file, cb) => {
    if (!body.userId) {
      return cb(
        { code: "BAD_REQUEST", message: "Please provide a userId" },
        null
      );
    }

    cb(null, getFileName(file.originalname, body.userId));
  },
});

const saveFiles = multer({
  storage: storage,
  fileFilter: (_, { originalname, mimetype }, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;

    const hasValidExtension = allowedFileTypes.test(extname(originalname));
    const hasValidMimetype = allowedFileTypes.test(mimetype);

    if (hasValidExtension && hasValidMimetype) {
      return cb(null, true);
    }

    return cb({ message: "Please provide image files only" }, false);
  },
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
