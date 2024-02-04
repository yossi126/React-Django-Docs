const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  uploadFile,
  downloadFile,
} = require("../controllers/BinDataController");

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/download/:id").get(downloadFile);

module.exports = router;
