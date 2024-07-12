const Plan = require('../models/Plan');

const createPlan = async (req, res) => {
    try {
        const plan = new Plan (req.body);
        await plan.save();
        res.status(201).json({ message: 'Plan created successfully', data: plan });
    } catch (error) {
      res.status(400).json({ message: 'Error creating plan', error: error.message });
    }
};

module.exports = {
    createPlan,
    // getPlans
};