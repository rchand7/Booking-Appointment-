const { google } = require("googleapis");
require("dotenv").config(); // Load environment variables from .env

// Use environment variables instead of hardcoding secrets
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const code = process.env.GOOGLE_AUTH_CODE; // Authorization code stored in .env

async function getRefreshToken() {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("\nGOOGLE_REFRESH_TOKEN=");
    console.log(tokens.refresh_token);
  } catch (error) {
    console.error("Error retrieving refresh token:", error);
  }
}

getRefreshToken();
