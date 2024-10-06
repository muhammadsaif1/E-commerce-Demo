require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectToDatabase = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/index");

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
