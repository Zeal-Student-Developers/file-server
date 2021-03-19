const sharp = require("sharp");
const { writeFileSync } = require("fs");

/** Size to which the image is to be resized */
const IMAGE_SIZE = {
  height: 1366,
  width: 720,
};

/**
 * Controller to get all the resolved issues
 * @param {Request} req Request Object
 * @param {Response} res Response Object
 */
const saveImagesController = (req, res) => {
  const files = req.files;

  try {
    files.forEach(async (file) => {
      const { path } = file;

      // Resizing image
      const buffer = await sharp(path)
        .resize(IMAGE_SIZE.height, IMAGE_SIZE.width)
        .jpeg({ quality: 65 })
        .toBuffer();

      writeFileSync(path, buffer);
    });

    res.status(200).json({
      files: files.map((file) => ({
        mimeType: file.mimetype,
        path: file.path,
        createdOn: Date.now(),
      })),
    });
  } catch (error) {
    res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      result: "FAILURE",
      message: error.message,
    });
  }
};

module.exports = { saveImagesController };
