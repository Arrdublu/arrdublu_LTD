import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe lazily inside the route handler
export async function POST(req: NextRequest) {
  try {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      console.warn("STRIPE_SECRET_KEY is not set.");
      return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
    }

    const stripe = new Stripe(key, {
      apiVersion: "2026-05-27.dahlia" as any,
    });

    const { amount, currency } = await req.json();

    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: { enabled: true },
      });
    } catch (error: any) {
      console.error("Stripe Error:", error.message);
      if (error.type === 'StripeAuthenticationError') {
        return NextResponse.json({ clientSecret: 'mock_client_secret_for_preview' });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
