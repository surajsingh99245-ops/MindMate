 
const express = require("express");

const MOOD_OPTIONS = ["Great", "Happy", "Neutral", "Sad", "Very Sad"];
const SLEEP_OPTIONS = ["Poor", "Fair", "Good", "Excellent"];
const EMOTION_OPTIONS = [
    "Happy", "Calm", "Excited", "Motivated", "Focused", "Relaxed",
    "Anxious", "Overwhelmed", "Lonely", "Sad", "Frustrated", "Angry"
];

function isIntInRange(value, min, max) {
    return Number.isInteger(value) && value >= min && value <= max;
}

 
function validateCheckinPayload(body) {
    const errors = [];

    const {
        username,
        mood,
        moodValue,
        stressLevel,
        energyLevel,
        sleepQuality,
        sleepValue,
        selectedEmotions,
        reflection
    } = body;

    if (typeof username !== "string" || !username.trim()) {
        errors.push("username is required and must be a non-empty string.");
    }

    if (!MOOD_OPTIONS.includes(mood)) {
        errors.push(`mood must be one of: ${MOOD_OPTIONS.join(", ")}`);
    }

    if (!isIntInRange(moodValue, 1, 5)) {
        errors.push("moodValue must be an integer between 1 and 5.");
    }

    if (!isIntInRange(stressLevel, 1, 5)) {
        errors.push("stressLevel must be an integer between 1 and 5.");
    }

    if (!isIntInRange(energyLevel, 1, 5)) {
        errors.push("energyLevel must be an integer between 1 and 5.");
    }

    if (!SLEEP_OPTIONS.includes(sleepQuality)) {
        errors.push(`sleepQuality must be one of: ${SLEEP_OPTIONS.join(", ")}`);
    }

    if (!isIntInRange(sleepValue, 1, 4)) {
        errors.push("sleepValue must be an integer between 1 and 4.");
    }

    if (selectedEmotions === undefined || selectedEmotions === null) {
        errors.push("selectedEmotions is required (use an empty array if none selected).");
    } else if (!Array.isArray(selectedEmotions)) {
        errors.push("selectedEmotions must be an array.");
    } else {
        if (selectedEmotions.length > 3) {
            errors.push("selectedEmotions can contain at most 3 items.");
        }

        const invalidEmotions = selectedEmotions.filter(
            (e) => typeof e !== "string" || !EMOTION_OPTIONS.includes(e)
        );
        if (invalidEmotions.length > 0) {
            errors.push(`Invalid emotion(s): ${invalidEmotions.join(", ")}`);
        }

        const uniqueCount = new Set(selectedEmotions).size;
        if (uniqueCount !== selectedEmotions.length) {
            errors.push("selectedEmotions must not contain duplicates.");
        }
    }

    if (reflection !== undefined && reflection !== null) {
        if (typeof reflection !== "string") {
            errors.push("reflection must be a string.");
        } else if (reflection.length > 500) {
            errors.push("reflection must be 500 characters or fewer.");
        }
    }

    return errors;
}
 
module.exports = function createDailyCheckinRouter(pool) {
    const router = express.Router();

 
    router.post("/daily-checkin", async (req, res) => {
        try {
        
            const errors = validateCheckinPayload(req.body);

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Validation failed.",
                    errors
                });
            }

            const {
                username,
                mood,
                moodValue,
                stressLevel,
                energyLevel,
                sleepQuality,
                sleepValue,
                selectedEmotions,
                reflection
            } = req.body;

            const cleanUsername = username.trim();
            const cleanReflection =
                typeof reflection === "string" && reflection.trim().length > 0
                    ? reflection.trim()
                    : null;
 
            const userCheck = await pool.query(
                "SELECT 1 FROM users WHERE username = $1",
                [cleanUsername]
            );

            if (userCheck.rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found."
                });
            }

            const result = await pool.query(
                `INSERT INTO daily_checkins
                    (username, mood, mood_value, stress_level, energy_level,
                     sleep_quality, sleep_value, selected_emotions, reflection,
                     checkin_date, created_at, updated_at)
                 VALUES
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE, NOW(), NOW())
                 ON CONFLICT (username, checkin_date)
                 DO UPDATE SET
                    mood = EXCLUDED.mood,
                    mood_value = EXCLUDED.mood_value,
                    stress_level = EXCLUDED.stress_level,
                    energy_level = EXCLUDED.energy_level,
                    sleep_quality = EXCLUDED.sleep_quality,
                    sleep_value = EXCLUDED.sleep_value,
                    selected_emotions = EXCLUDED.selected_emotions,
                    reflection = EXCLUDED.reflection,
                    updated_at = NOW()
                 RETURNING *`,
                [
                    cleanUsername,
                    mood,
                    moodValue,
                    stressLevel,
                    energyLevel,
                    sleepQuality,
                    sleepValue,
                    selectedEmotions,
                    cleanReflection
                ]
            );

            return res.status(200).json({
                success: true,
                message: "Check-in saved successfully!",
                checkin: result.rows[0]
            });

        } catch (err) {
            console.error("Daily check-in save error:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to save check-in."
            });
        }
    });
 
    router.get("/daily-checkin/today/:username", async (req, res) => {
        try {
            const { username } = req.params;

            if (!username || !username.trim()) {
                return res.status(400).json({
                    success: false,
                    message: "username is required."
                });
            }

            const result = await pool.query(
                `SELECT * FROM daily_checkins
                 WHERE username = $1 AND checkin_date = CURRENT_DATE`,
                [username.trim()]
            );

            return res.status(200).json({
                success: true,
                checkedInToday: result.rows.length > 0,
                checkin: result.rows[0] || null
            });

        } catch (err) {
            console.error("Daily check-in fetch error:", err);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch today's check-in."
            });
        }
    });

    return router;
};