const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const app = express();

/* ---------- CORS ---------- */
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true
}));

/* ---------- SESSION ---------- */
app.use(session({
  secret: "jino_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax", // easier for localhost testing
    secure: false,   // must be false for http
    httpOnly: true
  }
}));

/* ---------- BODY PARSER ---------- */
app.use(express.json());

/* ---------- DATABASE ---------- */
mongoose.connect("mongodb://127.0.0.1:27017/cgpa_portal")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

/* ---------- ROUTES ---------- */
app.use("/auth", require("./routes/authroutes"));
app.use("/batch", require("./routes/batchroutes"));
app.use("/staff", require("./routes/staffroutes"));

/* ---------- SERVER ---------- */
app.listen(3000, () => console.log("Backend running on port 3000"));