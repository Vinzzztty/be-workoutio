const Account = require("../models/Account");

const createAccount = async (req, res) => {
    try {
        const { username, password } = req.body;

        const account = new Account({ username, password });

        await account.save();
        res.status(201).json({
            message: "Account created successfully",
            data: account,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating account",
            error: error.message,
        });
    }
};

const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find();
        res.status(200).json({
            message: "Accounts retrieved successfully",
            data: accounts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving accounts",
            error: error.message,
        });
    }
};

// Login Route
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const account = await Account.findOne({ username, password });
        if (!account) {
            return res
                .status(400)
                .json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            data: { username: account.username },
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message,
        });
    }
};

module.exports = {
    createAccount,
    getAccounts,
    login,
};
