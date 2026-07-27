const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "MindMate Backend Running 🚀"
    });
});
app.get("/about", (req, res) => {
    res.json({
        project: "MindMate",
        version: "1.0",
        developer: "Suraj"
    });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});