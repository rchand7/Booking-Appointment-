const router = require("express").Router();
const Client = require("../models/Client");

router.get("/", async (req, res) => {
  const data = await Client.find();
  res.json(data);
});

module.exports = router;