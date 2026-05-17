const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({
  version: "v3",
  auth: oauth2Client
});

async function createMeeting(name, email, issue, selectedDate, selectedTime) {
  try {
    // selectedDate = "2026-05-17"
    // selectedTime = "19:30"

    const startDateTime = new Date(`${selectedDate}T${selectedTime}:00+05:30`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000);

    const event = {
      summary: `Consultation with ${name}`,
      description: `Issue: ${issue}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata"
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata"
      },
      attendees: [
        { email }, // client
        { email: process.env.ADMIN_EMAIL } // your email
      ],
      conferenceData: {
        createRequest: {
          requestId: "meet-" + Date.now()
        }
      }
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all"
    });

    return {
      meetLink: response.data.hangoutLink,
      eventId: response.data.id
    };
  } catch (error) {
    console.error("Google Meet creation error:", error.message);
    throw new Error("Unable to create Google Meet link.");
  }
}

module.exports = createMeeting;