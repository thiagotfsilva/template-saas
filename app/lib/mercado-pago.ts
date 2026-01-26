import MercadoPagoConfig from "mercadopago";

const apClient = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
});

export default apClient;
