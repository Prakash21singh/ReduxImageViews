const multer = require("multer");

const storage = multer.memoryStorage();
exports.upload = multer({
  storage,
  limits: {
    fieldSize: 100000,
  },
});
