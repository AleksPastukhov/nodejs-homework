const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 5 * Math.pow(2, 20) },
});

module.exports = upload;
