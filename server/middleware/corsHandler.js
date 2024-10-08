const cors = require("cors");

const corsMiddleware = cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
});

module.exports = corsMiddleware;
