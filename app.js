const express = require("express");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

const userModel = require("./models/User");

app.use('/', authRoutes);

app.use((err, req, res,next)=>{
    res.status(500).send("Server error: " + err.message)
})
  
  

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });