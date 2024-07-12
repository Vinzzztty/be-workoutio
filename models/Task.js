const mongoose = require ('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    targetReps: { type: Number, required: true},
    correct: { type: Number, required: true},
    incorrect: { type: Number, required: true},
    bulk: { type: Boolean, required: true}
});

module.exports= mongoose.model('Task', taskSchema);