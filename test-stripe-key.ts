import Stripe from 'stripe';

async function run() {
  try {
    const stripe = new Stripe("placeholder", { apiVersion: '2026-05-27.dahlia' as any });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
    });
  } catch (err: any) {
    console.log("Error type:", err.type);
    console.log("Error message:", err.message);
  }
}
run();
