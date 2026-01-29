import { Preference } from "mercadopago";
import { NextRequest, NextResponse } from "next/server";
import mpClient from "@/app/lib/mercado-pago";

export async function POST(req: NextRequest) {
  const { testId, userEmail } = await req.json();

  try {
    const preference = new Preference(mpClient);
    const createdPreference = await preference.create({
      body: {
        external_reference: testId, // impacta na pontuação do mercado pago
        metadata: {
          testId, // essa variavel é convertida para snake_case -> teste_id
        },
        ...(userEmail && { payer: { email: userEmail } }),
        items: [
          {
            id: "",
            description: "",
            title: "",
            quantity: 1,
            unit_price: 1,
            currency_id: "BRL",
            category_id: "services",
          },
        ],
        payment_methods: {
          installments: 12,
        },
        auto_return: "approved",
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercado-pago/pending`,
        },
      },
    });

    if (!createdPreference.id) {
      return NextResponse.json(
        { error: "Failed to create checkout" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 },
    );
  }
}
