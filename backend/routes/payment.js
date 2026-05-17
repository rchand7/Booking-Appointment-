const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_KEY);

// Test route (optional)
router.get("/test", (req, res) => {
  res.json({
    stripeKeyLoaded: !!process.env.STRIPE_KEY,
    stripePriceId: process.env.STRIPE_PRICE_ID,
    frontendUrl: process.env.FRONTEND_URL
  });
});

// Create Stripe Checkout Session
router.post("/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1
        }
      ],

      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/booking`
    });

    res.json({
      url: session.url
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    res.status(400).json({
      message: error.message,
      type: error.type,
      code: error.code
    });
  }
});

module.exports = router;