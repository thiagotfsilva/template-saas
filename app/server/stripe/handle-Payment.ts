import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";

async function handleStripePayment(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    const metadata = event.data.object.metadata;
        const userId = metadata?.customerId;

        if (!userId) {
          console.error("User ID not found");
          return;
        }

        await db.collection("users").doc(userId).update({
          stripeCustomerId: event.data.object.customer,
          stripeSubscriptionId: event.data.object.subscription,
          subscriptionStatus: "active",
        });
    console.log(
      "Pagemento realizado com sucesso. Enviar um email para liberar acesso"
    );
  }
}

export default handleStripePayment;
