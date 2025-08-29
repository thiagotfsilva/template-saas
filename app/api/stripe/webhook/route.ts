import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/app/lib/stripe";
import handleStripePayment from "@/app/server/stripe/handle-Payment";
import handleStripeSubscription from "@/app/server/stripe/handle-subscription";
import handleStripeCancelSubscription from "@/app/server/stripe/handle-cancel";

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature || !secret) {
      return NextResponse.json({ error: "No signature" }, { status: 400 });
    }

    const events = stripe.webhooks.constructEvent(body, signature, secret);

    switch (events.type) {
      case "checkout.session.completed": // pagamento realizdo se statu = paid | pagamento unico ou assinatura
        const metadata = events.data.object.metadata;

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripePayment(events);
        }

        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(events);
        }

        break;
      case "checkout.session.expired": // expirou o tempo de pagameno
        console.log(
          "Enviar e-mail para o usuário informando que o pagamento expirou"
        );
        break;
      case "checkout.session.async_payment_succeeded": // boleto pago
        console.log(
          "Enviar e-mail para ao usuário informando que o pagemento foi realizado"
        );
        break;
      case "checkout.session.async_payment_failed": // boleto falhou
        console.log(
          "Enviar e-mail para ao usuário informando que o pagemento falhou"
        );
        break;
      case "customer.subscription.created": // criou assinatura
        console.log(
          "Enviar e-mail de boas vindas ao usuário que acabou de fazer assinatura"
        );
        break;
      case "customer.subscription.deleted": // cancelou assinatura
        await handleStripeCancelSubscription(events);
        break;
      default:
        console.log(events.type);
        break;
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch(error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error"},
      { status: 500 }
    );
  }

}
