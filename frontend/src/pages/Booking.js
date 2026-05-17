import { useState } from "react";
import axios from "axios";

export default function Booking() {
  // Read backend URL from frontend/.env
  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async () => {
    try {
      // Optional: check in browser console (F12 -> Console)
      console.log("API URL:", API_URL);

      const res = await axios.post(
        `${API_URL}/api/book`,
        form
      );

      alert(
        "Booking Confirmed!\n\nGoogle Meet Link:\n" +
          res.data.booking.meetLink
      );

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Booking Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to create booking."
      );
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Book Consultation
      </h1>

      <input
        name="name"
        placeholder="Your Name"
        className="border p-3 w-full mb-3"
        onChange={handleChange}
      />

      <input
        name="email"
        type="email"
        placeholder="Your Email"
        className="border p-3 w-full mb-3"
        onChange={handleChange}
      />

      <textarea
        name="issue"
        placeholder="Describe Your Issue"
        className="border p-3 w-full mb-3"
        rows="4"
        onChange={handleChange}
      />

      <input
        name="date"
        type="date"
        className="border p-3 w-full mb-3"
        onChange={handleChange}
      />

      <input
        name="time"
        type="time"
        className="border p-3 w-full mb-4"
        onChange={handleChange}
      />

      <button
        onClick={handleBooking}
        className="bg-blue-600 text-white px-6 py-3 rounded w-full"
      >
        Confirm Booking
      </button>
    </div>
  );
}
