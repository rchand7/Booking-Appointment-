const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  issue: String,
  meetLink: String,
  status: { type: String, default: "Booked" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);