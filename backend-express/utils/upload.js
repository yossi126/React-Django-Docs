//upload.js
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// Create storage engine
function upload(type, type2) {
  const mongodbUrl = process.env.MONGO_URI;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: req.query.type2,
          bucketName: "filesBucket",
          metadata: {
            type: type,
            type2: type2,
          },
        };
        console.log(req.query);
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };
