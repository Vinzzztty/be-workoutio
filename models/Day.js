const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  status: { type: String, required: true },
  task: { type: String, required: true }
});

module.exports = mongoose.model('Day', daySchema);
