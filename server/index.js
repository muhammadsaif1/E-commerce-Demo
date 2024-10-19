require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/index");
const corsMiddleware = require("./middleware/corsHandler");
const adminProductsRouter = require("./routes/admin/products");

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
