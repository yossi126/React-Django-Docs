const mongoose = require("mongoose");

// Create a schema for the file
const fileSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
  version: Number,
  type: {
    type: String,
    required: [true, "Please provide file type"],
    enum: {
      values: ["Pos", "Self-Pos", "Hardware"],
    },
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: null },
});

module.exports = mongoose.model("File", fileSchema);
