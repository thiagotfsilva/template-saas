import { NextRequest, NextResponse } from "next/server";
import mpClient, { validateMecadoPagoWebhook } from "@/app/lib/mercado-pago";
import { Payment } from "mercadopago";
import { handleMercadoPagoPayment } from "@/app/server/mecado-pago/handle-payment";

export async function POST(req: NextRequest) {
  try {
    validateMecadoPagoWebhook(req);

    const body = await req.json();
    const { type, data } = body;

    switch (type) {
      case 'payment':
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === "approved" ||
          paymentData.date_approved !== null
        ) {
          await handleMercadoPagoPayment(paymentData);
        }
        break;
      case 'subscription_preapproval':
        break;
      default:
        console.log("Events isn't unsupported");
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "WebHook handler failed" },
      { status: 500 },
    );
  }
}
