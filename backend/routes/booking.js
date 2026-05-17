const express = require("express");
const router = express.Router();
const createMeeting = require("../utils/googleMeet");

router.post("/", async (req, res) => {
  try {
    const { name, email, issue, date, time } = req.body;

    if (!name || !email || !issue || !date || !time) {
      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const meeting = await createMeeting(
      name,
      email,
      issue,
      date,
      time
    );

    const booking = {
      id: Date.now(),
      name,
      email,
      issue,
      date,
      time,
      meetLink: meeting.meetLink,
      status: "Confirmed",
      createdAt: new Date()
    };

    res.status(201).json({
      message: "Booking created successfully.",
      booking
    });
  } catch (error) {
    console.error("Booking creation error:", error.message);
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;