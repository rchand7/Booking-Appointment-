const router = require("express").Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_KEY);

router.post("/", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }]
    });

    res.json(subscription);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;