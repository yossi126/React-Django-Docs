const File = require("../model/fileModel");

const uploadFile = async (req, res) => {
  const file = new File({
    filename: req.body.name,
    data: req.file.buffer,
    contentType: req.file.mimetype,
    version: Number(req.body.version),
    type: req.body.type,
    createdAt: new Date(req.body.createdAt),
  });
  try {
    await file.save();
    res
      .status(201)
      .json({ file: file.filename, message: "File uploaded successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    const fileData = Buffer.from(file.data, "base64"); // Convert base64 string back to binary

    const sanitizedFilename = encodeURIComponent(file.filename); // Sanitize filename from hebrew
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `attachment; filename="${sanitizedFilename}"`,
    });

    res.send(fileData); // Send binary data as response
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({}, { data: 0 });
    res.status(200).json({ files });
  } catch (error) {
    res.status(500).send;
  }
};

/*
app.post("/upload/test", upload.single("file"), async (req, res) => {
  const file = new File({
    filename: req.file.originalname,
    data: req.file.buffer,
    contentType: req.file.mimetype,
  });
  file.save();
  // console.log(req.file);
  res.send("ok");
});

//download file
app.get("/download/:id", async (req, res) => {
  const file = await File.findById(req.params.id);
  const fileData = Buffer.from(file.data, "base64"); // Convert base64 string back to binary
  console.log(file.filename);
  res.set({
    "Content-Type": file.contentType,
    "Content-Disposition": `attachment; filename=${file.filename}`,
  });

  res.send(fileData); // Send binary data as response
});
 */

module.exports = {
  uploadFile,
  downloadFile,
  getAllFiles,
};
