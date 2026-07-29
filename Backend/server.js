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
        const { username, message } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-flash-latest",
            contents: `
You are MindMate AI, a supportive mental wellness companion.

Your task is to respond ONLY with valid JSON.

Return this exact format:

{
  "reply": "Your supportive response",
  "mood": "Happy | Calm | Neutral | Sad | Anxious | Angry | Stressed",
  "stressLevel": 1,
  "sentiment": "Positive | Neutral | Negative"
}

Rules:
- reply should be empathetic and supportive.
- Never diagnose diseases.
- Never prescribe medicines.
- stressLevel must be an integer from 1 to 10.
- Return ONLY JSON.
- Do not use markdown.
- Do not wrap the JSON in \`\`\`.

User message:
${message}
`
        });

        const aiText = response.candidates[0].content.parts[0].text;

        const aiData = JSON.parse(aiText);
        await pool.query(
            `INSERT INTO chat_history
    (username, user_message, ai_reply, mood, stress_level, sentiment)
    VALUES ($1, $2, $3, $4, $5, $6)`,
            [
                username,
                message,
                aiData.reply,
                aiData.mood,
                aiData.stressLevel,
                aiData.sentiment
            ]
        );

        res.status(200).json({
            success: true,
            reply: aiData.reply,
            mood: aiData.mood,
            stressLevel: aiData.stressLevel,
            sentiment: aiData.sentiment
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
app.get("/report/weekly/:username", async (req, res) => { 

    try {
        const { username } = req.params;
 
        const test = await pool.query(
            `SELECT COUNT(DISTINCT checkin_date) AS total
     FROM daily_checkins
     WHERE username = $1`,
            [username]
        );

       
        // AI Chat Data
        const result = await pool.query(
            `SELECT *
             FROM chat_history
             WHERE username = $1
             AND created_at >= CURRENT_DATE - INTERVAL '6 days'
             ORDER BY created_at`,
            [username]
        );

        const rows = result.rows;

        // Daily Check-ins Count
        const dailyCheckinResult = await pool.query(
            `SELECT COUNT(DISTINCT checkin_date) AS total
             FROM daily_checkins
             WHERE username = $1
             AND checkin_date >= CURRENT_DATE - INTERVAL '6 days'`,
            [username]
        );

        const checkins = Number(dailyCheckinResult.rows[0].total);

        // Current Streak (Daily Check-ins)
        const streakResult = await pool.query(
            `SELECT checkin_date
             FROM daily_checkins
             WHERE username = $1
             ORDER BY checkin_date DESC`,
            [username]
        );

        const checkinDates = new Set(
            streakResult.rows.map(row =>
                row.checkin_date.toISOString().split("T")[0]
            )
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let streak = 0;

        for (let i = 0; i < 7; i++) {

            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() - i);

            const dateString = currentDate.toISOString().split("T")[0];

            if (checkinDates.has(dateString)) {
                streak++;
            } else {
                break;
            }
        }

        if (rows.length === 0) {
      
            return res.json({
                summary: {
                    averageMood: "Neutral",
                    checkins: `${checkins} / 7 Days`,
                    streak: `${streak} Days`,
                    journalEntries: `0 Entries`
                },
                charts: {
                    labels: [],
                    moodTrend: [],
                    journalActivity: []
                },
                distribution: {
                    happy: 0,
                    calm: 0,
                    neutral: 0,
                    sad: 0,
                    anxious: 0
                },
                insights: [
                    "Start chatting with MindMate to generate your first report."
                ]
            });
        }

        const moodMap = {
            Happy: 5,
            Calm: 4,
            Neutral: 3,
            Sad: 2,
            Anxious: 1
        };

        let distribution = {
            happy: 0,
            calm: 0,
            neutral: 0,
            sad: 0,
            anxious: 0
        };

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const dayData = {
            Mon: { moodSum: 0, moodCount: 0, journal: 0 },
            Tue: { moodSum: 0, moodCount: 0, journal: 0 },
            Wed: { moodSum: 0, moodCount: 0, journal: 0 },
            Thu: { moodSum: 0, moodCount: 0, journal: 0 },
            Fri: { moodSum: 0, moodCount: 0, journal: 0 },
            Sat: { moodSum: 0, moodCount: 0, journal: 0 },
            Sun: { moodSum: 0, moodCount: 0, journal: 0 }
        };

        let stressTotal = 0;

        rows.forEach((row) => {

            const day = new Date(row.created_at)
                .toLocaleDateString("en-US", { weekday: "short" });

            const moodValue = moodMap[row.mood] || 3;

            dayData[day].moodSum += moodValue;
            dayData[day].moodCount++;
            dayData[day].journal++;

            stressTotal += row.stress_level;

            if (row.mood) {
                const key = row.mood.toLowerCase();

                if (distribution[key] !== undefined) {
                    distribution[key]++;
                }
            }

        });

        const labels = days;

        const moodTrend = days.map(day => {
            if (dayData[day].moodCount === 0) return 0;

            return Number(
                (dayData[day].moodSum / dayData[day].moodCount).toFixed(1)
            );
        });

        const journalActivity = days.map(day => dayData[day].journal);
        const total = rows.length;

        Object.keys(distribution).forEach(key => {
            distribution[key] = Math.round(distribution[key] * 100 / total);
        });

        const validMoodDays = moodTrend.filter(value => value > 0);

        const moodAverage =
            validMoodDays.length > 0
                ? validMoodDays.reduce((a, b) => a + b, 0) / validMoodDays.length
                : 3;

        const moodText =
            moodAverage >= 4.5 ? "Happy" :
                moodAverage >= 3.5 ? "Calm" :
                    moodAverage >= 2.5 ? "Neutral" :
                        moodAverage >= 1.5 ? "Sad" :
                            "Anxious";

        res.json({

            summary: {
                averageMood: moodText,
                checkins: `${checkins} / 7 Days`,
                streak: `${streak} Days`,
                journalEntries: `${total} Entries`
            },

            charts: {
                labels,
                moodTrend,
                journalActivity
            },

            distribution,

            insights: [
                `Average stress level: ${(stressTotal / total).toFixed(1)}/10`,
                `You completed ${checkins} daily check-ins.`,
                `Your dominant mood is ${moodText}.`,
                "Keep checking in daily for better insights."
            ]

        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
app.get("/report/monthly/:username", async (req, res) => {

    try {

        const { username } = req.params;

        const result = await pool.query(
            `SELECT *
     FROM chat_history
     WHERE username = $1
     AND created_at >= CURRENT_DATE - INTERVAL '29 days'
     ORDER BY created_at`,
            [username]
        );
 const rows = result.rows;

// Daily Check-ins Count
const dailyCheckinResult = await pool.query(
    `SELECT COUNT(DISTINCT checkin_date) AS total
     FROM daily_checkins
     WHERE username = $1
     AND checkin_date >= CURRENT_DATE - INTERVAL '29 days'`,
    [username]
);

const checkins = Number(dailyCheckinResult.rows[0].total);

// AI Chat Days (keep for mood calculations)
const uniqueDays = new Set();

rows.forEach((row) => {
    const date = new Date(row.created_at)
        .toISOString()
        .split("T")[0];

    uniqueDays.add(date);
});

// Current Streak (Daily Check-ins)
const streakResult = await pool.query(
    `SELECT checkin_date
     FROM daily_checkins
     WHERE username = $1
     ORDER BY checkin_date DESC`,
    [username]
);

const checkinDates = new Set(
    streakResult.rows.map(row =>
        row.checkin_date.toISOString().split("T")[0]
    )
);

const today = new Date();
today.setHours(0, 0, 0, 0);

let streak = 0;

for (let i = 0; i < 30; i++) {

    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() - i);

    const dateString = currentDate
        .toISOString()
        .split("T")[0];

    if (checkinDates.has(dateString)) {
        streak++;
    } else {
        break;
    }
}

  if (rows.length === 0 && checkins === 0) {
    return res.json({
        summary: {
            averageMood: "Neutral",
            checkins: `${checkins} / 30 Days`,
            streak: `${streak} Days`,
            journalEntries: `0 Entries`
        },
        charts: {
            labels: [],
            moodTrend: [],
            journalActivity: []
        },
        distribution: {
            happy: 0,
            calm: 0,
            neutral: 0,
            sad: 0,
            anxious: 0
        },
        insights: [
            "Start chatting with MindMate to generate your first report."
        ]
    });
}

        const moodMap = {
            Happy: 5,
            Calm: 4,
            Neutral: 3,
            Sad: 2,
            Anxious: 1
        };

        let distribution = {
            happy: 0,
            calm: 0,
            neutral: 0,
            sad: 0,
            anxious: 0
        };

        const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

        const weekData = {
            "Week 1": { moodSum: 0, moodCount: 0, journal: 0 },
            "Week 2": { moodSum: 0, moodCount: 0, journal: 0 },
            "Week 3": { moodSum: 0, moodCount: 0, journal: 0 },
            "Week 4": { moodSum: 0, moodCount: 0, journal: 0 },
            "Week 5": { moodSum: 0, moodCount: 0, journal: 0 }
        };

        let stressTotal = 0;

        rows.forEach((row) => {

            const dayOfMonth = new Date(row.created_at).getDate();

            let week;

            if (dayOfMonth <= 7) {
                week = "Week 1";
            } else if (dayOfMonth <= 14) {
                week = "Week 2";
            } else if (dayOfMonth <= 21) {
                week = "Week 3";
            } else if (dayOfMonth <= 28) {
                week = "Week 4";
            } else {
                week = "Week 5";
            }

            const moodValue = moodMap[row.mood] || 3;

            weekData[week].moodSum += moodValue;
            weekData[week].moodCount++;
            weekData[week].journal++;

            stressTotal += row.stress_level;

            if (row.mood) {
                const key = row.mood.toLowerCase();

                if (distribution[key] !== undefined) {
                    distribution[key]++;
                }
            }

        });

        const labels = weeks;

        const moodTrend = weeks.map(week => {
            if (weekData[week].moodCount === 0) return 0;

            return Number(
                (weekData[week].moodSum / weekData[week].moodCount).toFixed(1)
            );
        });

        const journalActivity = weeks.map(week => weekData[week].journal);
        const total = rows.length;

        Object.keys(distribution).forEach(key => {
            distribution[key] = Math.round(distribution[key] * 100 / total);
        });

        const moodAverage =
            moodTrend.reduce((a, b) => a + b, 0) / moodTrend.length;

        const moodText =
            moodAverage >= 4.5 ? "Happy" :
                moodAverage >= 3.5 ? "Calm" :
                    moodAverage >= 2.5 ? "Neutral" :
                        moodAverage >= 1.5 ? "Sad" :
                            "Anxious";

        res.json({

            summary: {
                averageMood: moodText,
                checkins: `${checkins} / 30 Days`,
                streak: `${streak} Days`,
                journalEntries: `${total} Entries`
            },

            charts: {
                labels,
                moodTrend,
                journalActivity
            },

            distribution,

            insights: [
                `Average stress level: ${(stressTotal / total).toFixed(1)}/10`,
                `You completed ${total} check-ins.`,
                `Your dominant mood is ${moodText}.`,
                "Keep checking in daily for better insights."
            ]

        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
});
const dailyCheckinRoutes = require("./daily-checkin.routes.js");
app.use("/", dailyCheckinRoutes(pool));
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});