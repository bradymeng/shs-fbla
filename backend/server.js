const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "eventData.json";

// Load initial data or create file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        date: "October 24, 2024; 4:00-7:00pm",
        location: "2400s Hallway, Stevenson High School",
        prompt1: "Find a company struggling due to current events, define the struggle, and propose a solution.",
        prompt2: "Compare 2 companies in the same industry, highlight similarities/differences, and propose the more successful company."
    }, null, 2));
}

// Get event details
app.get("/api/event", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading data" });
        }
        res.json(JSON.parse(data));
    });
});

// Update event details (Admin Only)
app.post("/api/event", (req, res) => {
    const updatedData = req.body;

    fs.writeFile(DATA_FILE, JSON.stringify(updatedData, null, 2), "utf8", (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving data" });
        }
        res.json({ message: "Event updated successfully!" });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
