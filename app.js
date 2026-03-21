const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();

// -------------- MOBILE-SAFE CORS ----------------
app.use(cors({
    origin: "*",       // mobile browsers allowed
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
// ------------------------------------------------

// Static folders
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

// DB
mongoose.connect("mongodb://localhost:27017")
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}));

// ------------ JWT Middleware ------------------
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).sendFile(
            path.join(__dirname, "html", "error.html")
        );
    }

    jwt.verify(token, "SECRET123", (err, decoded) => {
        if (err) {
            return res.status(403).sendFile(
                path.join(__dirname, "html", "error.html")
            );
        }

        req.user = decoded;
        next();
    });
}
// ----------------------------------------------


// ---------------- HTML ROUTES -----------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "register.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "register.html"));
});

// CORRECT LOGIN PAGE
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "login.html"));
});

// Protect dashboard
app.get("/dashboard", verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, "html", "dashboard.html"));
});

// Error Page
app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "error.html"));
});
// ------------------------------------------------


// ----------- API ROUTES (mobile-safe) ----------

// Dashboard data
app.get("/dashboard-data", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

// Register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hash });

    res.json({ message: "Registration successful" });
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, "SECRET123", {
        expiresIn: "1h"
    });

    res.json({ message: "Login successful", token });
});

// Logout
app.get("/logout", (req, res) => {
    res.redirect("/login");
});
// ------------------------------------------------

// Start Server
app.listen(4000, () =>
    console.log("Server running on http://localhost:4000")
);