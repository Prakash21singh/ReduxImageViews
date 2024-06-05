const { number } = require("joi");
const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  upload: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

exports.Upload = mongoose.model("Upload", uploadSchema);
