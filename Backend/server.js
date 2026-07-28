const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { Pool } = require("pg");
const { GoogleGenAI } = require("@google/genai");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});
const app = express();
app.use(express.json());
app.use(cors());
// Test Database Connection
// Test Database Connection
pool.query("SELECT NOW()")
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
app.use("/Frontend", express.static(path.join(__dirname, "../Frontend")));
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
        message: "Hello Devloper!",
        learning: "Backend is fun 🚀"
    });
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});
app.post("/journal", async (req, res) => {
    try {
        const { username, title, note } = req.body;

        await pool.query(
            `INSERT INTO journals (username, title, note)
             VALUES ($1, $2, $3)`,
            [username, title, note]
        );

        res.status(201).json({
            success: true,
            message: "Journal saved successfully!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to save journal."
        });
    }
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
app.get("/journal/:username", async (req, res) => {
    try {
        const { username } = req.params;

        const result = await pool.query(
            `SELECT * FROM journals
             WHERE username = $1
             ORDER BY created_at DESC`,
            [username]
        );

        res.status(200).json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch journals."
        });
    }
});
app.delete("/journal/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM journals WHERE id = $1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Journal deleted successfully!"
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to delete journal."
        });
    }
});
app.put("/journal/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { title, note } = req.body;

        await pool.query(
            `UPDATE journals
             SET title = $1, note = $2
             WHERE id = $3`,
            [title, note, id]
        );

        res.status(200).json({
            success: true,
            message: "Journal updated successfully!"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to update journal."
        });

    }
});
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: `
You are MindMate AI.

You are a supportive mental wellness companion.

Be empathetic.

Never diagnose diseases.

Never prescribe medicines.

Keep responses friendly, encouraging, and concise.

User:
${message}
`
        });

        res.status(200).json({
            success: true,
            reply: response.candidates[0].content.parts[0].text
        });

    } catch (err) {
        console.error("========== GEMINI ERROR ==========");
        console.error(err);
        console.error("=================================");

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});
app.get("/models", async (req, res) => {
    try {
        const models = await ai.models.list();

        res.json(models);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});