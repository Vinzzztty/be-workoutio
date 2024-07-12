const Plan = require('../models/Plan');

const createPlan = async (req, res) => {
    try {
        const { day, exercises } = req.body;

        const plan = new Plan({ day, exercises });
        await plan.save();
        res.status(201).json({ message: 'Plan created successfully', data: plan });
    } catch (error) {
      res.status(400).json({ message: 'Error creating plan', error: error.message });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json({ message: 'Plans retrieved successfully', data: plans});
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving plans', error: error.message});
    }

}

module.exports = {
    createPlan,
    getPlans
};