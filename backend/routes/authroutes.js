const express = require("express");
const bcrypt = require("bcrypt");
const jUser = require("../models/User");

const jRouter = express.Router();

/* ---------- LOGIN ---------- */
jRouter.post("/login", async (req, res) => {
  try {
    const { username, password, role, department } = req.body;

    const user = await jUser.findOne({ username });
    if (!user) return res.status(401).json({ success: false });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false });

    if (user.role !== role) return res.status(401).json({ success: false });

    // Check department for BOTH staff and HOD
    if (user.department !== department) 
      return res.status(401).json({ success: false });

    // Save session
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role,
      department: user.department
    };

    req.session.save(() => {
      res.json({ success: true, user: req.session.user });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ---------- CHECK SESSION ---------- */
jRouter.get("/check-session", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

/* ---------- LOGOUT ---------- */
jRouter.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ success: true }));
});

module.exports = jRouter;