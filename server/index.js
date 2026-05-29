/**
 * Backend de pagos Skold — Transbank Webpay Plus.
 *
 * Por defecto corre en modo INTEGRACIÓN (sandbox) con las credenciales
 * públicas de prueba de Transbank: puedes pagar con tarjetas de prueba
 * sin cuenta de comercio real.
 *
 * Para PRODUCCIÓN define variables de entorno (ver server/.env.example):
 *   TBK_ENV=produccion
 *   TBK_COMMERCE_CODE=<tu código de comercio>
 *   TBK_API_KEY=<tu llave secreta>
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const {
  WebpayPlus,
  Options,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Environment
} = require('transbank-sdk');

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';
const SELF_URL = process.env.SELF_URL || `http://localhost:${PORT}`;

// --- Configuración Transbank ---
function buildTransaction() {
  if (process.env.TBK_ENV === 'produccion') {
    return new WebpayPlus.Transaction(
      new Options(process.env.TBK_COMMERCE_CODE, process.env.TBK_API_KEY, Environment.Production)
    );
  }
  // Integración (sandbox) con credenciales públicas de prueba.
  return new WebpayPlus.Transaction(
    new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration)
  );
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Webpay hace POST url-encoded al volver

const RETURN_URL = `${SELF_URL}/api/checkout/return`;

/** Crea una transacción y devuelve { token, url } para redirigir a Webpay. */
app.post('/api/checkout/create', async (req, res) => {
  try {
    const { buyOrder, sessionId, amount } = req.body;
    if (!buyOrder || !sessionId || !amount) {
      return res.status(400).json({ error: 'buyOrder, sessionId y amount son obligatorios' });
    }
    const tx = buildTransaction();
    const response = await tx.create(
      String(buyOrder).slice(0, 26),
      String(sessionId).slice(0, 61),
      Math.round(Number(amount)),
      RETURN_URL
    );
    res.json({ token: response.token, url: response.url });
  } catch (err) {
    console.error('create error:', err.message);
    res.status(500).json({ error: 'No se pudo iniciar el pago', detail: err.message });
  }
});

/**
 * Webpay redirige (POST) aquí al terminar. Confirmamos la transacción
 * y redirigimos al frontend con el resultado en query params.
 */
async function handleReturn(req, res) {
  const token = req.body.token_ws || req.query.token_ws;
  const tbkToken = req.body.TBK_TOKEN || req.query.TBK_TOKEN;

  // Usuario anuló el pago en el formulario de Webpay.
  if (tbkToken && !token) {
    return res.redirect(`${FRONTEND_URL}/checkout/resultado?status=aborted`);
  }
  if (!token) {
    return res.redirect(`${FRONTEND_URL}/checkout/resultado?status=error`);
  }

  try {
    const tx = buildTransaction();
    const result = await tx.commit(token);
    const ok = result.response_code === 0 && result.status === 'AUTHORIZED';
    const params = new URLSearchParams({
      status: ok ? 'success' : 'rejected',
      buyOrder: result.buy_order || '',
      amount: String(result.amount || ''),
      auth: result.authorization_code || '',
      card: (result.card_detail && result.card_detail.card_number) || '',
      paymentType: result.payment_type_code || '',
      date: result.transaction_date || ''
    });
    res.redirect(`${FRONTEND_URL}/checkout/resultado?${params.toString()}`);
  } catch (err) {
    console.error('commit error:', err.message);
    res.redirect(`${FRONTEND_URL}/checkout/resultado?status=error`);
  }
}
app.post('/api/checkout/return', handleReturn);
app.get('/api/checkout/return', handleReturn);

/** Confirmación manual (opcional), por si el frontend maneja el token. */
app.post('/api/checkout/commit', async (req, res) => {
  try {
    const tx = buildTransaction();
    const r = await tx.commit(req.body.token);
    res.json({
      status: r.status,
      buyOrder: r.buy_order,
      amount: r.amount,
      authorizationCode: r.authorization_code,
      paymentTypeCode: r.payment_type_code,
      cardNumber: r.card_detail && r.card_detail.card_number,
      transactionDate: r.transaction_date,
      responseCode: r.response_code
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: process.env.TBK_ENV === 'produccion' ? 'produccion' : 'integracion' });
});

app.listen(PORT, () => {
  const mode = process.env.TBK_ENV === 'produccion' ? 'PRODUCCIÓN' : 'INTEGRACIÓN (sandbox)';
  console.log(`\n🔥 Skold pagos — backend en ${SELF_URL}  ·  Webpay: ${mode}`);
  console.log(`   Return URL: ${RETURN_URL}`);
  console.log(`   Frontend:   ${FRONTEND_URL}\n`);
});
