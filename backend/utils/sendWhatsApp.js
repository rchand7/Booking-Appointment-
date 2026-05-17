const twilio = require("twilio");

async function sendWhatsApp(message) {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH
    );

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
      body: message
    });

    console.log("WhatsApp notification sent.");
  } catch (error) {
    console.error("WhatsApp notification failed:", error.message);
  }
}

module.exports = sendWhatsApp;