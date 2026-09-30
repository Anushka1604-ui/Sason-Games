const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");

const app = express();

// ------------------- CORS -------------------
app.use(cors({
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// ---------------- STATIC FILES --------------
app.use(express.static(path.join(__dirname, "html")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

// ---------------- DATABASE ------------------
// ❗ Important: Use Render environment variable (NOT localhost)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Error:", err));

// ---------------- USER MODEL ----------------
const User = mongoose.model("User", new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
}));

// ---------------- JWT MIDDLEWARE ------------
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).sendFile(path.join(__dirname, "html", "error.html"));
    }

    jwt.verify(token, "SECRET123", (err, decoded) => {
        if (err) {
            return res.status(403).sendFile(path.join(__dirname, "html", "error.html"));
        }

        req.user = decoded;
        next();
    });
}

// ---------------- HTML ROUTES ---------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "register.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "login.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "dashboard.html"));
});

app.get("/dashboard", verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, "html", "dashboard.html"));
});

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "error.html"));
});

// ---------------- API ROUTES ----------------

// dashboard data
app.get("/dashboard-data", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
});

// register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hash });

    res.json({ message: "Registration successful" });
});

// login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ error: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
});

// logout
app.get("/logout", (req, res) => {
    res.redirect("/login");
});

// ---------------- START SERVER --------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});