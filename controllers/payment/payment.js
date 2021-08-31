"use strict";

const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51GtsI6CDacaYxHbOYoLkjgG65QoCCyrZKtTHhfmKcQGFeD6XgKCqZBT2VZSQZwRAFiB3L1DDDqiqFFLAWXU8NyPW00MXrjGmqA";
const STRIPE_SECRET_KEY =
  "sk_test_51GtsI6CDacaYxHbOZ8YBDHQnD0jCKhqCcXuhmCalHbugAU1rKOkAgJ5pOcbkstNjq8ynKhXl3dnRbawq6WeSLLpn001uRlektr";

const stripe = require("stripe")(STRIPE_SECRET_KEY);

exports.createPayment = async function (req, res) {
  try {
    const { amount } = req.body;
    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
