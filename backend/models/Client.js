const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  status: { type: String, default: "New" },
  notes: String,
  revenue: Number
}, { timestamps: true });

module.exports = mongoose.model("Client", clientSchema);