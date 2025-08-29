import stripe from "@/app/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { testId, userEmail } = await req.json();
  const price = process.env.STRIPE_PRODUCT_PRICE_ID;

  if (!price) {
    return NextResponse.json({ error: "Price not found" }, { status: 500 });
  }

  const metadata = {
    testId,
    price,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }], // itens vendidos
      mode: "payment",
      payment_method_types: ["card", "boleto"], // metodos de pagamento
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      ...(userEmail && { customer_email: userEmail }),
      metadata
    });

    if (!session.url) {
      return NextResponse.json({ error: "Price not found" }, { status: 500 });
    };

    return NextResponse.json({ sessionId: session.id }, { status: 200 })
  } catch (error) {
    console.log((error as Error).message);
    return NextResponse.error();
  }
}
