const sharp = require("sharp");
const { writeFileSync } = require("fs");

const saveImages = require("../services/MulterService");

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
const saveImagesController = async (req, res) => {
  saveImages(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        code:
          error.code === "BAD_REQUEST" ? error.code : "INTERNAL_SERVER_ERROR",
        result: "FAILURE",
        message: error.message,
      });
    }

    try {
      const files = req.files;

      if (files.length === 0)
        return res.status(400).json({
          code: "BAD_REQUEST",
          result: "FAILURE",
          message: "Please provide images to save",
        });

      for (let index = 0; index < files.length; index++) {
        const { path } = files[index];

        // Resizing image
        const buffer = await sharp(path)
          .resize(IMAGE_SIZE.height, IMAGE_SIZE.width)
          .jpeg({ quality: 75 })
          .toBuffer();

        writeFileSync(path, buffer);
      }

      res.status(200).json({
        code: "OK",
        result: "SUCCESS",
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
  });
};

module.exports = { saveImagesController };
