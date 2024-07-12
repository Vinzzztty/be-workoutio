const Day = require('../models/Day');

const createDay = async (req, res) => {
    try{
        const { status, task } = req.body

        const day = new Day({ status, task });
        await day.save();
        res.status(201).json({ message: 'Day created successfully', data: day });
    } catch (error) {
      res.status(400).json({ message: 'Error creating day', error: error.message });
    }
};

const getDays = async (req, res) => {
    try {
        const days = await Day.find();
        res.status(200).json({ message: 'Days retrieved successfully', data: days });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving days', error: error.message });
  }
 };

 module.exports = {
    createDay,
    getDays
 };