const mongoose = require("mongoose");

const exercisePlanSchema = new mongoose.Schema(
    {
        day: String,
        muscle: [String],
        workout: [String],
        repetitions: [[Number]],
    },
    { collection: "exercisePlans" }
);

const ExercisePlan = mongoose.model("ExercisePlan", exercisePlanSchema);

module.exports = ExercisePlan;
