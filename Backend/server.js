const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const app = express();

// Test Database Connection
pool.connect()
    .then(() => {
        console.log("✅ Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("❌ Database connection failed:");
        console.error(err);
    });

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

 
app.post("/signup", async (req, res) => {
    try {
        const { fullName, username, password } = req.body;

        await pool.query(
            `INSERT INTO users (full_name, username, password)
             VALUES ($1, $2, $3)`,
            [fullName, username, password]
        );

        res.status(201).json({
            success: true,
            message: "Account created successfully!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});