
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ------------------- CORS -------------------
app.use(cors());

// ------------------- JSON -------------------
app.use(express.json());

// ------------------- STATIC FILES -------------------
// Serve files from html, css, and js folders
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

// ------------------- HOME PAGE -------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "dashboard.html"));
});

// ------------------- DASHBOARD -------------------

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "dashboard.html"));
});

// ------------------- ERROR PAGE -------------------

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "error.html"));
});

// ------------------- START SERVER -------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


