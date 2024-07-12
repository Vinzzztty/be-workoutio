const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
    arm: { type: Number, required: false },
    legs: { type: Number, required: false },
    abs: { type: Number, required: false },
    chest: { type: Number, required: false },
    glutes: { type: Number, required: false },
    back: { type: Number, required: false },
});

module.exports = mongoose.model("Stats", statsSchema);
