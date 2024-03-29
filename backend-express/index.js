const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/config");
const mongoose = require("mongoose");
const { upload } = require("./utils/upload");
// const path = require("path");
dotenv.config();
var compression = require("compression");
const app = express();
const path = require("path");
// Connect to database
connectDB();

// Connect to MongoDB GridFS bucket using mongoose
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "filesBucket",
    });
  });
})();

//routers
const binDataRouter = require("./routes/BinDataRoutes");

app.use(express.json());
app.use(logger("dev"));
app.use(cors());
app.use(compression());
app.use(express.static("public"));

app.use("/api", binDataRouter);

app.get("/", (req, res) => {
  res.send("<h1>Starter</h1>");
});

// Routes for API endpoints
// Upload a single file
app.post("/upload/file", upload().single("file"), async (req, res) => {
  try {
    // const fileName = req.file.originalname;
    // console.log(req.file);
    res.status(201).json({ text: "File uploaded successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});

app.post(
  "/upload/filea",
  (req, res, next) => {
    const uploadMiddleware = upload(req.query.type, req.query.type2).single(
      "file"
    );
    uploadMiddleware(req, res, next);
  },
  async (req, res) => {
    try {
      res.status(201).json({ text: "File uploaded successfully !" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: { text: "Unable to upload the file", error },
      });
    }
  }
);

//test
app.post("/test", async (req, res) => {
  // const { buffer } = req.file;
  console.log(req.file);
  res.json({ req });
});

// Upload multiple files
app.post("/upload/files", upload().array("files"), async (req, res) => {
  try {
    res.status(201).json({ text: "Files uploaded successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to upload files`, error },
    });
  }
});

// Download a file by id
app.get("/download/file/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;

    // Find the file in the GridFS bucket
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();

    if (!file || file.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    // console.log(file[0].contentType);
    // Set the appropriate headers for the response
    const sanitizedFilename = encodeURIComponent(file[0].filename);
    res.set({
      "Content-Type": file[0].contentType,
      "Content-Disposition": `attachment; filename="${sanitizedFilename}"`,
    });

    // Create a readable stream from the GridFS file and pipe it to the response
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rename a file
app.put("/rename/file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    const { filename } = req.body;
    await bucket.rename(new mongoose.Types.ObjectId(fileId), filename);
    res.status(200).json({ text: "File renamed successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to rename file`, error },
    });
  }
});

// Delete a file
app.delete("/delete/file/:fileId", async (req, res) => {
  try {
    const { fileId } = req.params;
    await bucket.delete(new mongoose.Types.ObjectId(fileId));
    res.status(200).json({ text: "File deleted successfully !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to delete file`, error },
    });
  }
});

// get file name by id
app.get("/get/file/:fileId", async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await bucket
      .find({ _id: new mongoose.Types.ObjectId(fileId) })
      .toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    // const encodedFilename = file[0].filename;
    // const decodedFilename = decodeURIComponent(encodedFilename);
    res.status(200).json({ filename: file[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: `Unable to get file`, error },
    });
  }
});

// Server listening on port 3000 for incoming requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
