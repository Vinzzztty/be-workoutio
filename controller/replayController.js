const Replay = require('../models/Replay');

const createReplay = async (req, res) => {
    try {
        const { exampleVideoUrl, resultVideoUrl } = req.body;

        const replay = new Replay({ exampleVideoUrl, resultVideoUrl});
        await replay.save();
        res.status(201).json({ message: 'Replay created successfully', data: replay });
    } catch (error){
        res.status(400).json({ message: 'Error  retrieving replays', error: error.message});
    }
};

module.exports = {
    createReplay,
    // getReplays
};