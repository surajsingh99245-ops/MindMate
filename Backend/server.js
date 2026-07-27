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