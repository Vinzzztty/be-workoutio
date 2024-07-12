const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true }
});

const planSchema = new mongoose.Schema({
    day: { type: String, required: true },
    exercises: [exerciseSchema]
 
});

module.exports = mongoose.model('Plan', planSchema);