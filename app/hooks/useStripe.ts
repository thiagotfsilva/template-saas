import { loadStripe, Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function loadStripeAsync() {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
      );

      setStripe(stripeInstance);
    }

    loadStripeAsync();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createPaymentStripeCheckout(checkoutData: any) {
    if(!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData)
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.id })
    } catch (error) {
      console.log(error)
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createSubscriptionStripeCheckout(checkoutData: any) {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/creste-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.log(error)
    }
  };

  async function handleCreateStripePortal() {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    window.location.href = data.url;
  };

  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal
  };
}