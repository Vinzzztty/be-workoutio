const NewPlan = require('../models/NewPlan');

const createNewPlan = async (req, res) => {
    try {
        const { day, eexercises } = req.body;

        const newPlan = new NewPlan({ day, exercises });
        await newPlan.save();
        res.status(201).json({ message: 'New plan created successfully', data: newPlan});
    } catch (error) {
        res.status(400).json({ message: 'Error creating new plan', error: errorr.message});
    }
};

const addExerciseToPlan = async (req, res) => {
    try {
        const { day, exercises } = req.body;

        let plan = await NewPlan.findone({ day });
        if (plan) {
            plan.exercises.push(...exercises);
        } else {
            plan = new NewPlan({ day, exercises });
        }
        await plan.save();
        res.status(200).json({ message: 'Exercise added to plan successfully', data: plan});
        } catch (error) {
            res.status(400).json({ message: 'Error adding exercise to plan', error: error.message});
    }
};

const getNewPlans = async (req, res) => {
    try {
      const newPlans = await NewPlan.find();
      res.status(200).json({ message: 'New plans retrieved successfully', data: newPlans });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving new plans', error: error.message });
    }
  };

module.exports = {
    createNewPlan,
    addExerciseToPlan,
    getNewPlans
};