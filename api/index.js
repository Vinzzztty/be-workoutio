const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/dbconfig");

const accountRoutes = require("../routes/Account");
const dayRoutes = require("../routes/Day");
const planRoutes = require("../routes/Plan");
const statsRoutes = require("../routes/Stats");
const replayRoutes = require("../routes/Replay");
const newPlanRoutes = require("../routes/NewPlans");

const gemini_api_key = "AIzaSyAlNQUIZAuPtajMpJFwlf8oV7yDwPnGhP4";
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiConfig = {
    tempertature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputtokens: 4096,
};

const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});
// Load environment variables
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.set("trust proxt", 1);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/accounts", accountRoutes);
app.use("/plans", planRoutes);
app.use("/days", dayRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/replays", replayRoutes);
app.use("/newPlans", newPlanRoutes);

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

const generateContent = async (prompt) => {
    try {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error("response error", error);
        throw new Error("Error generating content");
    }
};

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`🚀 [SERVER] is running on port http://localhost:${port}`);
});
