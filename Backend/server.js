const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MindMate Backend Running 🚀"
    });
});

// About Route
app.get("/about", (req, res) => {
    res.json({
        project: "MindMate",
        version: "1.0",
        developer: "Suraj"
    });
});

// Hello Route
app.get("/hello", (req, res) => {
    res.json({
        message: "Hello Suraj!",
        learning: "Backend is fun 🚀"
    });
});

// Login Route
app.post("/login", (req, res) => {
    console.log("Request Body:", req.body);

    res.status(200).json({
        success: true,
        message: "Login request received!",
        data: req.body
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});