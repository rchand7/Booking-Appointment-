const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

/*
=====================================================
CORS Configuration
Allow requests only from:
1. Local development (http://localhost:3000)
2. Your deployed frontend on Render
=====================================================
*/
const allowedOrigins = [
  "http://localhost:3000",
  "https://bookinggg-appointment-2.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g. Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy does not allow this origin."));
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/book", require("./routes/booking"));
app.use("/api/crm", require("./routes/crm"));

// Health Check Route
app.get("/", (req, res) => {
  res.send("Booking API is running successfully.");
});

// 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
