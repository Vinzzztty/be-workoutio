const mongoose = require('mongoose');

const replaySchema = new mongoose.Schema({
    exampleVideoUrl: { type: String, required: true },
    resultVideoUrl: { type: String, required: true }
});

module.exports = mongoose.model('Replay', replaySchema);