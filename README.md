# 🔥 Skold · Estufas a Pellet

Sitio web e-commerce para **Skold Estufas a Pellet** (Temuco, Chile): catálogo, punto de venta con pago real vía **Webpay Plus (Transbank)**, reseñas de clientes, galería y más.

Construido con **Angular 20 + PrimeNG 20** (frontend) y **Node/Express + transbank-sdk** (backend de pagos).

> Basado en la marca de [@skold_estufaspellet](https://www.instagram.com/skold_estufaspellet/). Productos, precios, reseñas e imágenes son de **ejemplo** y editables; reemplázalos por los reales.

---

## ✨ Funcionalidades

- **Inicio** — hero, propuesta de valor, modelos destacados, cómo funciona el pellet, reseñas y CTA.
- **Catálogo** — filtros por categoría, búsqueda y ordenamiento; estufas interior/exterior, insertables, calderas, pellet y accesorios.
- **Detalle de producto** — galería, ficha técnica, características, productos relacionados y compra.
- **Carrito** — persistente (localStorage), cantidades, cálculo de despacho.
- **Checkout + pago real** — datos del cliente, despacho/retiro y pago con **Webpay Plus**.
- **Reseñas** — promedio, distribución por estrellas y formulario para dejar reseña.
- **Galería** — grilla tipo masonry con filtros y lightbox.
- **Nosotros / Contacto** — historia, valores, formulario y datos de contacto.
- Botón flotante de **WhatsApp** (+56 9 3865 9397) y enlaces a Instagram.

---

## 🚀 Puesta en marcha

Requisitos: **Node 18+** y **npm**.

```bash
npm install
```

### Desarrollo (frontend + backend juntos)

```bash
npm run dev
```

- Frontend: http://localhost:4200
- Backend de pagos: http://localhost:3000
- El frontend redirige `/api/*` al backend mediante `proxy.conf.json`.

O por separado:

```bash
npm start        # solo Angular (http://localhost:4200)
npm run server   # solo backend de pagos (http://localhost:3000)
```

### Build de producción

```bash
npm run build    # genera dist/skold/browser
```

---

## 💳 Pagos con Webpay Plus

Por defecto el backend corre en **modo integración (sandbox)** con las credenciales
públicas de prueba de Transbank: **puedes pagar de extremo a extremo sin cuenta de comercio**.

### Tarjetas de prueba (ambiente de integración)

| Tipo | Número | Datos |
|------|--------|-------|
| VISA (aprueba) | 4051 8856 0044 6623 | CVV 123 · cualquier fecha futura |
| MASTERCARD (rechaza) | 5186 0595 5959 0568 | CVV 123 |
| Autenticación banco simulado | RUT 11.111.111-1 | clave: **123** |

Flujo: carrito → checkout → *Pagar* → formulario Webpay → vuelve a `/checkout/resultado`.

### Pasar a PRODUCCIÓN

1. Obtén tu **código de comercio** y **API key** de Transbank.
2. Copia `server/.env.example` a `server/.env` y completa:
   ```env
   TBK_ENV=produccion
   TBK_COMMERCE_CODE=tu_codigo
   TBK_API_KEY=tu_llave
   FRONTEND_URL=https://tudominio.cl
   SELF_URL=https://api.tudominio.cl
   ```
3. Reinicia el backend.

---

## 🛠️ Cómo editar el contenido

| Quiero cambiar… | Archivo |
|-----------------|---------|
| Productos, precios, specs | `src/app/data/products.data.ts` |
| Reseñas | `src/app/data/reviews.data.ts` |
| Galería | `src/app/data/gallery.data.ts` |
| Colores / tema de marca | `src/app/theme/skold-preset.ts` y `src/styles.scss` |
| Teléfono / WhatsApp / Instagram | `src/app/layout/footer.component.ts`, `src/app/app.html`, `src/app/pages/contact.component.ts` |
| Imágenes | `public/img/` (ver más abajo) |

### Imágenes

Las imágenes son ilustraciones **SVG** generadas por `scripts/gen-assets.mjs`
(para no depender de archivos externos). Para usar **fotos reales**, deja tus
archivos en `public/img/` y apunta a ellos desde los datos
(ej. en `products.data.ts` cambia `img/aurora-black.svg` por `img/aurora-black.jpg`).

Regenerar las ilustraciones de ejemplo:

```bash
node scripts/gen-assets.mjs
```

---

## 📁 Estructura

```
src/app/
  data/        # contenido editable (productos, reseñas, galería)
  models/      # interfaces TypeScript
  services/    # ProductService, CartService (signals), ReviewService, OrderService
  layout/      # header, footer
  pages/       # home, catalog, product-detail, cart, checkout, checkout-result,
               # reviews, gallery, about, contact
  shared/      # product-card, pipe CLP
  theme/       # preset de PrimeNG (paleta de marca)
server/        # backend Express + Webpay Plus
scripts/       # generador de assets SVG
public/img/    # imágenes
```

---

## 🧩 Próximos pasos sugeridos

- Persistir pedidos en una base de datos y enviar correo de confirmación.
- Conectar el formulario de contacto a un correo/CRM (hoy es demo).
- Panel de administración para editar productos sin tocar código.
- Integrar despacho real (cálculo por región / courier).
- Agregar Mercado Pago como medio de pago alternativo.

---

Hecho con 🔥 para Skold.
