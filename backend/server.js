const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

// 1. Consider restricting CORS origins here in production
app.use(cors()); 
app.use(express.json());

// Active Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/book", require("./routes/booking"));
app.use("/api/crm", require("./routes/crm"));

// Health Check Route
app.get("/", (req, res) => {
  res.send("Booking API is running successfully.");
});

// 2. Handle 404 Route Errors
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// 3. Centralized Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
