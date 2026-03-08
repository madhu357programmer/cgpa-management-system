///home/jinodaya/Desktop/final1/backend/routes/batchroutes.js
const express = require("express");
const jRouter = express.Router();
const jBatch = require("../models/batch");

// Test endpoint
jRouter.get("/test", (req, res) => {
  res.json({ message: "Server is running", timestamp: new Date() });
});

// Create or Reset Batch
jRouter.post("/add", async (req, res) => {
  try {
    const { batch } = req.body;

    let jData = await jBatch.findOne({ batch });

    if (jData) {
      jData.semesters = [];
      jData.students = [];
    } else {
      jData = new jBatch({
        batch,
        semesters: [],
        students: []
      });
    }

    await jData.save();
    res.json({ message: "Batch created/reset" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Save CGPA + Credits (All Semesters + Students)
jRouter.post("/save/:batch", async (req, res) => {
  try {
    const { batch } = req.params;
    const { students, credits } = req.body;

    const jData = await jBatch.findOne({ batch });
    if (!jData) return res.status(404).json({ message: "Batch not found" });

    // Update students
    jData.students = students;

    // Update semester credits
    jData.semesters = credits.map((c, i) => ({ sem: i + 1, credits: c }));

    await jData.save();
    res.json({ message: "Batch saved successfully" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Load Full Batch Data
jRouter.get("/load/:batch", async (req, res) => {
  try {
    const { batch } = req.params;
    const jData = await jBatch.findOne({ batch });

    if (!jData) return res.status(404).json({ message: "Batch not found" });

    // Send only what frontend needs: students + credits
    res.json({
      students: jData.students,
      credits: jData.semesters.map(s => s.credits)
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete Batch
jRouter.delete("/delete/:batch", async (req, res) => {
  try {
    await jBatch.deleteOne({ batch: req.params.batch });
    res.json({ message: "Batch deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = jRouter;