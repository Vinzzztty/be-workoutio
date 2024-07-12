const Stats = require('../models/Stats');

const createStats = async (req,res) => {
    try {
        const stats = new Stats (req.body);
        await stats.save();
        res.status(201).json({ message: 'Stats created successfully', data: stats });
  } catch (error) {
    res.status(400).json({ message: 'Error creating stats', error: error.message });
  }
 };

 const getStats = async (req, res) => {
    try {
        const stats = await Stats.find();
        res.status(200).json({ message: 'Stats retrieved successfully', data: stats });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving stats', error: error.message });
  }
    };

module.exports = {
    createStats,
    getStats
};
