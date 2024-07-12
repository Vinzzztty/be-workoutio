// models/NewPlan.js

const mongoose = require("mongoose");
const Exercise = require("./Exercise");

const newPlanSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    promptText: { type: String, required: true },
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }], // Reference to Exercise schema
});

const NewPlan = mongoose.model("NewPlan", newPlanSchema);

module.exports = NewPlan;
