const mongoose = require('mongoose');

const SelectedImageSchema = new mongoose.Schema({
  imageSequence: [{ type: String }],
  authorId: { type: String, required: true, unique: true },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('SelectedImage', SelectedImageSchema);
