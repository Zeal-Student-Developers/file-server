const router = require("express").Router();
const saveImages = require("../services/MulterService");

router.post("/", saveImages, (req, res) => {
  const files = req.files;
  res.json({
    files: files.map((file) => ({
      mimeType: file.mimetype,
      path: file.path,
      createdOn: Date.now(),
    })),
  });
});

module.exports = router;
