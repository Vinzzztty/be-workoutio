const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  arm: { type: Number, required: true },
  legs: { type: Number, required: true },
  abs: { type: Number, required: true },
  chest: { type: Number, required: true },
  glutes: { type: Number, required: true },
  back: { type: Number, required: true }
});

module.exports = mongoose.model('Stats', statsSchema);
