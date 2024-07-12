const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconfig");


const accountRoutes = require('./routes/Account');
const dayRoutes = require('./routes/Day');
const planRoutes = require('./routes/Plan');
const statsRoutes = require('./routes/Stats');
const replayRoutes = require('./routes/Replay');

// Load environment variables
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.set("trust proxt", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use('/accounts', accountRoutes);
app.use('/plans', planRoutes);
app.use('/days', dayRoutes);    
app.use('/stats', statsRoutes);
app.use('/replays', replayRoutes);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`🚀 [SERVER] is running on port http://localhost:${port}`);
});