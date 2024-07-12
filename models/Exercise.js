// models/Exercise.js

const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    muscle_group: { type: String, required: true },
    reps: { type: Number, required: true },
    sets: { type: Number, required: true },
    duration: { type: String }, // Optional field for exercises like Plank that have duration
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
