require("dotenv").config();
const express = require("express");
const connectToDatabase = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/index");
const corsMiddleware = require("./middleware/corsHandler");
const adminProductsRouter = require("./routes/admin/products");
const shopProductsRouter = require("./routes/shop/products");
const shopCartRouter = require("./routes/shop/cart");
const shopAddressRouter = require("./routes/shop/address");
const shopOrderRouter = require("./routes/shop/order");
const adminOrderRouter = require("./routes/admin/order");

connectToDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(corsMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
