const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
      const { name, targetReps, correct, incorrect } = req.body;
      
      if (!name || targetReps == null || correct == null || incorrect == null) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const bulk = correct / targetReps > 0.75;
      
      const task = new Task({
        name,
        targetReps,
        correct,
        incorrect,
        bulk
      });
  
      await task.save();
      res.status(201).json({ message: 'Task created successfully', data: task });
    } catch (error) {
      res.status(400).json({ message: 'Error creating task', error: error.message });
    }
  };
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ message: 'Task retrieved successfully', data: tasks });
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
}
};

module.exports = {
    createTask,
    getTasks
};
