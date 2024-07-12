const express = require("express");
const cors = require("cors");
const connectDB = require("../config/dbconfig");

const accountRoutes = require("../routes/Account");
const dayRoutes = require("../routes/Day");
const planRoutes = require("../routes/Plan");
const statsRoutes = require("../routes/Stats");
const replayRoutes = require("../routes/Replay");

// Load environment variables
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.set("trust proxt", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/accounts", accountRoutes);
app.use("/plans", planRoutes);
app.use("/days", dayRoutes);
app.use("/stats", statsRoutes);
app.use("/replays", replayRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
    });
});

//Handle 404
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Not Found",
    });
});

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`🚀 [SERVER] is running on port http://localhost:${port}`);
});
