const express = require("express");
const bcrypt = require("bcrypt");
const jUser = require("../models/User");

const jRouter = express.Router();

// Create Staff
jRouter.post("/create", async (req, res) => {
  const { username, password, department } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = new jUser({
    username,
    password: hashed,
    role: "staff",
    department
  });

  await user.save();
  res.json({ message: "Staff created" });
});

// View Staff
jRouter.get("/view", async (req, res) => {
  const data = await jUser.find({ role: "staff" });
  res.json(data);
});

// Reset Password
jRouter.post("/reset", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  await jUser.updateOne({ username }, { $set: { password: hashed } });
  res.json({ message: "Password updated" });
});

module.exports = jRouter;