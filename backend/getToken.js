const { google } = require("googleapis");
require("dotenv").config(); // Load environment variables from .env

// Use environment variables instead of hardcoding secrets
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: ["https://www.googleapis.com/auth/calendar"]
});

console.log("Authorize this URL:");
console.log(authUrl);
