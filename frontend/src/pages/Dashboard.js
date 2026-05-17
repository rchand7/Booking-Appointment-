import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="border p-4 my-3 rounded shadow-sm">
            <p><strong>Name:</strong> {b.name}</p>
            <p><strong>Email:</strong> {b.email}</p>
            <p><strong>Issue:</strong> {b.issue}</p>
            <p><strong>Status:</strong> {b.status}</p>

            <a
              href={b.meetLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline font-semibold"
            >
              Join Meeting
            </a>
          </div>
        ))
      )}
    </div>
  );
}