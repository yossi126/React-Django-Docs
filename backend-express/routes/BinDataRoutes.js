const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  uploadFile,
  downloadFile,
  getAllFiles,
} = require("../controllers/BinDataController");

router.route("/upload").post(upload.single("file"), uploadFile);
router.route("/download/:id").get(downloadFile);
router.route("/").get(getAllFiles);

module.exports = router;
