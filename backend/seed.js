const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()
const User = require("./models/User")

mongoose.connect(process.env.MONGO_URI)
.then(async() => {
  const a = await bcrypt.hash("hod123", 10)
  await User.create({
    username: "it_hod",
    password: a,
    role: "hod",
    department: "IT"
  })
  console.log("HOD created")
  process.exit()
})