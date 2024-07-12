const Stats = require("../models/Stats");

const createStats = async (req, res) => {
    try {
        const { arm, legs, abs, chest, glutes, back } = req.body;

        const stats = new Stats({ arm, legs, abs, chest, glutes, back });

        await stats.save();
        res.status(201).json({
            message: "Stats created successfully",
            data: stats,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating stats",
            error: error.message,
        });
    }
};

const getStats = async (req, res) => {
    try {
        const stats = await Stats.find();
        res.status(200).json({
            message: "Stats retrieved successfully",
            data: stats,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving stats",
            error: error.message,
        });
    }
};

const updateStats = async (req, res) => {
    try {
        const updateData = req.body;

        const stats = await Stats.findOne();
        if (!stats) {
            return res.status(404).json({
                message: "Stats not found",
            });
        }

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] !== undefined) {
                stats[key] = updateData[key];
            }
        });

        await stats.save();

        res.status(200).json({
            message: "Stats updated successfully",
            data: stats,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating stats",
            error: error.message,
        });
    }
};

module.exports = {
    createStats,
    getStats,
    updateStats,
};
