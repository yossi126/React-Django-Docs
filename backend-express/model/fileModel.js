const mongoose = require("mongoose");

// Create a schema for the file
const fileSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
});

module.exports = mongoose.model("File", fileSchema);
