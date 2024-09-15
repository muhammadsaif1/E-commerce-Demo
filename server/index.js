const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://saifshabir12:JILrzK6K4wNQLbec@cluster0.ypk9a.mongodb.net/"
  )
  .then(() => console.log("database connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({}));
