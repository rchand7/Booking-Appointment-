const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
connectDB();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});