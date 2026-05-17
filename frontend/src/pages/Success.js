import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Success() {
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Correct API URL
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const createMeeting = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/book`,
          {
            name: "Paid Client",
            email: "client@example.com",
            issue: "Consultation",
          }
        );

        const link =
          res.data.booking?.meetLink ||
          res.data.meetLink ||
          "Meeting scheduled successfully.";

        setMeetingLink(link);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to create meeting. Please check backend."
        );
      } finally {
        setLoading(false);
      }
    };

    createMeeting();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold">Creating your meeting...</h2>
        <p>Please wait while we generate your Google Meet link.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        <h2 className="text-2xl font-bold">Meeting Creation Failed</h2>
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful!
      </h1>

      <p className="mb-6">
        Your consultation has been booked successfully.
      </p>

      <a
        href={meetingLink}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 text-white px-6 py-3 rounded inline-block"
      >
        Join Google Meet
      </a>
    </div>
  );
}
