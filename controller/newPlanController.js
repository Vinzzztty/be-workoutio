const NewPlan = require("../models/NewPlan");
const Exercise = require("../models/Exercise");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const createNewPlan = async (req, res) => {
    try {
        const { day, exercises } = req.body;

        const newPlan = new NewPlan({ day, exercises });
        await newPlan.save();
        res.status(201).json({
            message: "New plan created successfully",
            data: newPlan,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating new plan",
            error: errorr.message,
        });
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
        res.status(200).json({
            message: "Exercise added to plan successfully",
            data: plan,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error adding exercise to plan",
            error: error.message,
        });
    }
};

const getNewPlans = async (req, res) => {
    try {
        const newPlans = await NewPlan.find();
        res.status(200).json({
            message: "New plans retrieved successfully",
            data: newPlans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving new plans",
            error: error.message,
        });
    }
};

const generateAiPlan = async (req, res) => {
    try {
        const { weight, height, muscle_target } = req.body;

        // Validate muscle_target length (1 to 6)
        if (muscle_target.length < 1 || muscle_target.length > 6) {
            return res.status(400).json({
                status: "error",
                message:
                    "Invalid muscle target list. Please select between 1 and 6 muscles.",
            });
        }

        // Function to generate exercise plan using Gemini AI
        const generateExercisePlan = async () => {
            const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const geminiConfig = {
                temperature: 0,
                topP: 1,
                topK: 1,
                maxOutputTokens: 500,
            };

            const geminiModel = googleAI.getGenerativeModel({
                model: "gemini-pro",
                geminiConfig,
            });

            // Construct prompt text based on user input
            const promptText = `Hi, I am weight ${weight}, and height ${height}. I want to create a 7-day exercise plan.\nThe exercise targets: ${muscle_target.join(
                ", "
            )}.\nPlease generate a detailed 7-day exercise plan with bullet points for each day, clearly labeled as Day 1, Day 2, etc. Each day should include the muscle groups targeted, the workouts, and the repetitions.`;

            // Generate exercise plan from Gemini AI
            const generatedResponse = await geminiModel.generateContent(
                promptText
            );

            // Return the generated exercise plan (already in JSON format)
            return generatedResponse;
        };

        // Generate exercise plan
        const exercisePlan = await generateExercisePlan();

        // Extract and format the generated plan
        const rawPlan =
            exercisePlan.response.candidates[0].content.parts[0].text;

        // Split the raw plan into lines and structure it
        const lines = rawPlan.split("\n");
        const structuredPlan = {};
        let currentDay = null;
        let currentMuscles = [];

        lines.forEach((line) => {
            if (line.startsWith("**Day")) {
                currentDay = line
                    .replace(/\*\*/g, "")
                    .trim()
                    .split(":")[0]
                    .replace("Day ", "");
                currentMuscles = line
                    .split(":")[1]
                    .split(",")
                    .map((muscle) => muscle.replace(/\*\*/g, "").trim());
                structuredPlan[currentDay] = {
                    muscle: currentMuscles,
                    workout: [],
                    repetitions: [],
                };
            } else if (line.startsWith("* ") && currentDay) {
                const workoutDetails = line
                    .replace("* ", "")
                    .trim()
                    .split(": ");
                const workoutName = workoutDetails[0];
                const repetitionsPart = workoutDetails[1];
                let repetitions = [];
                if (repetitionsPart) {
                    repetitions = repetitionsPart.match(/\d+/g).map(Number);
                }
                structuredPlan[currentDay].workout.push(workoutName);
                structuredPlan[currentDay].repetitions.push(repetitions[1]);
            }
        });

        // Ensure all muscle names are cleaned
        Object.keys(structuredPlan).forEach((day) => {
            structuredPlan[day].muscle = structuredPlan[day].muscle.map(
                (muscle) => muscle.replace(/\*\*/g, "").trim()
            );
        });

        // Respond with success message and structured plan
        res.status(200).json({
            status: "success",
            message: "Exercise plan generated successfully",
            data: structuredPlan,
        });
    } catch (error) {
        // Handle errors
        console.error("Error generating exercise plan:", error);
        res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
            error: error.message,
        });
    }
};

module.exports = {
    createNewPlan,
    addExerciseToPlan,
    getNewPlans,
    generateAiPlan,
};
