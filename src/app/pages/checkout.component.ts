import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { ClpPipe } from '../shared/clp.pipe';
import { ShippingMethod } from '../models/order.model';

@Component({
  selector: 'sk-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule, ClpPipe],
  template: `
    <div class="sk-container wrap">
      @if (cart.items().length === 0) {
        <div class="empty">
          <i class="pi pi-shopping-cart"></i>
          <h2>No hay productos para pagar</h2>
          <p-button label="Ir al catálogo" routerLink="/catalogo" />
        </div>
      } @else {
        <nav class="crumbs"><a routerLink="/carrito">← Volver al carrito</a></nav>
        <h1 class="sk-title">Finalizar compra</h1>

        <div class="layout">
          <form class="form" (submit)="pay($event)">
            <fieldset>
              <legend>Tus datos</legend>
              <div class="two">
                <div class="f"><label>Nombre completo *</label><input pInputText [(ngModel)]="c.name" name="name" /></div>
                <div class="f"><label>RUT</label><input pInputText [(ngModel)]="c.rut" name="rut" placeholder="12.345.678-9" /></div>
              </div>
              <div class="two">
                <div class="f"><label>Email *</label><input pInputText type="email" [(ngModel)]="c.email" name="email" /></div>
                <div class="f"><label>Teléfono *</label><input pInputText [(ngModel)]="c.phone" name="phone" placeholder="+56 9 …" /></div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Entrega</legend>
              <div class="ship">
                <label class="opt" [class.on]="method() === 'despacho'">
                  <input type="radio" name="ship" value="despacho" [checked]="method()==='despacho'" (change)="method.set('despacho')" />
                  <span class="ic"><i class="pi pi-truck"></i></span>
                  <span><strong>Despacho a domicilio</strong><small>A todo Chile · coordinamos el envío</small></span>
                </label>
                <label class="opt" [class.on]="method() === 'retiro'">
                  <input type="radio" name="ship" value="retiro" [checked]="method()==='retiro'" (change)="method.set('retiro')" />
                  <span class="ic"><i class="pi pi-shop"></i></span>
                  <span><strong>Retiro en showroom</strong><small>Av. Calor 1234, Temuco</small></span>
                </label>
              </div>

              @if (method() === 'despacho') {
                <div class="two">
                  <div class="f"><label>Región *</label>
                    <p-select [options]="regiones" [(ngModel)]="c.region" name="region" placeholder="Selecciona" styleClass="w-full" appendTo="body" />
                  </div>
                  <div class="f"><label>Comuna / Ciudad *</label><input pInputText [(ngModel)]="c.city" name="city" /></div>
                </div>
                <div class="f"><label>Dirección *</label><input pInputText [(ngModel)]="c.address" name="address" placeholder="Calle, número, depto." /></div>
              }
              <div class="f"><label>Notas (opcional)</label><textarea pTextarea [(ngModel)]="c.notes" name="notes" rows="2" placeholder="Referencias de entrega, horarios, etc."></textarea></div>
            </fieldset>

            <p-button type="submit" [label]="paying() ? 'Redirigiendo a Webpay…' : 'Pagar ' + (cart.total() | clp)"
                      icon="pi pi-lock" size="large" styleClass="w-full" [loading]="paying()" />
            <p class="secure"><i class="pi pi-shield"></i> Serás redirigido a Webpay para completar el pago de forma segura.</p>
          </form>

          <!-- Resumen -->
          <aside class="summary">
            <h3>Tu pedido</h3>
            @for (item of cart.items(); track item.product.id) {
              <div class="li">
                <img [src]="item.product.images[0]" [alt]="item.product.name" />
                <div class="li-meta"><span>{{ item.product.name }}</span><small>Cantidad: {{ item.quantity }}</small></div>
                <span class="li-price">{{ item.product.price * item.quantity | clp }}</span>
              </div>
            }
            <div class="row"><span>Subtotal</span><span>{{ cart.subtotal() | clp }}</span></div>
            <div class="row"><span>Despacho</span><span>{{ shippingLabel() }}</span></div>
            <div class="row total"><span>Total</span><span>{{ payable() | clp }}</span></div>
          </aside>
        </div>
      }
    </div>
  `,
  styles: [`
    .wrap { padding-block: 2.5rem 4rem; }
    .crumbs { margin-bottom: .8rem; }
    .crumbs a { color: var(--sk-muted); font-weight: 600; }
    .crumbs a:hover { color: var(--sk-ember-deep); }
    .sk-title { margin-bottom: 1.8rem; }
    .layout { display: grid; grid-template-columns: 1fr 360px; gap: 2rem; align-items: start; }
    .form fieldset { border: 1px solid rgba(42,37,33,.12); border-radius: var(--sk-radius-lg); padding: 1.4rem; margin: 0 0 1.4rem; }
    .form legend { font-family: var(--sk-font-display); font-size: 1.2rem; padding: 0 .5rem; }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .f { margin-bottom: 1rem; }
    .f:last-child { margin-bottom: 0; }
    .f label { display: block; font-weight: 700; font-size: .8rem; color: var(--sk-muted); margin-bottom: .4rem; }
    .f input, .f textarea { width: 100%; }
    .ship { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; margin-bottom: 1.2rem; }
    .opt { display: flex; align-items: center; gap: .7rem; border: 1px solid var(--sk-sand); border-radius: 14px; padding: .9rem; cursor: pointer; transition: all .15s; }
    .opt.on { border-color: var(--sk-ember); background: rgba(226,87,30,.05); }
    .opt input { display: none; }
    .opt .ic { width: 38px; height: 38px; border-radius: 10px; display: grid; place-items: center; background: var(--sk-cream-2); color: var(--sk-ember-deep); }
    .opt strong { display: block; font-size: .92rem; }
    .opt small { color: var(--sk-muted); font-size: .78rem; }
    .secure { text-align: center; font-size: .82rem; color: var(--sk-muted); margin-top: 1rem; }
    .summary { position: sticky; top: 88px; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.5rem; box-shadow: var(--sk-shadow-soft); }
    .summary h3 { margin-bottom: 1rem; }
    .li { display: grid; grid-template-columns: 48px 1fr auto; gap: .7rem; align-items: center; margin-bottom: .8rem; }
    .li img { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; }
    .li-meta span { font-size: .9rem; font-weight: 600; display: block; line-height: 1.2; }
    .li-meta small { color: var(--sk-muted); font-size: .78rem; }
    .li-price { font-weight: 600; font-size: .9rem; }
    .row { display: flex; justify-content: space-between; padding: .45rem 0; color: var(--sk-muted); border-top: 1px solid rgba(42,37,33,.08); }
    .row.total { color: var(--sk-iron); font-weight: 700; font-size: 1.25rem; }
    .row.total span:last-child { font-family: var(--sk-font-display); }
    .empty { text-align: center; padding: 4rem 1rem; }
    .empty i { font-size: 3rem; color: var(--sk-sand); display: block; margin-bottom: 1rem; }
    .empty h2 { margin-bottom: 1.5rem; }
    :host ::ng-deep .w-full { width: 100%; }
    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } .summary { position: static; } .two, .ship { grid-template-columns: 1fr; } }
  `]
})
export class CheckoutComponent {
  protected cart = inject(CartService);
  private orders = inject(OrderService);
  private msg = inject(MessageService);
  private router = inject(Router);

  protected method = signal<ShippingMethod>('despacho');
  protected paying = signal(false);

  protected c = {
    name: '', rut: '', email: '', phone: '',
    region: null as string | null, city: '', address: '', notes: ''
  };

  protected regiones = [
    'Arica y Parinacota', 'Tarapacá', 'Antofagasta', 'Atacama', 'Coquimbo',
    'Valparaíso', 'Metropolitana', "O'Higgins", 'Maule', 'Ñuble', 'Biobío',
    'La Araucanía', 'Los Ríos', 'Los Lagos', 'Aysén', 'Magallanes'
  ].map((r) => ({ label: r, value: r }));

  /** Si retira en tienda, no cobra despacho. */
  protected payable = computed(() =>
    this.method() === 'retiro' ? this.cart.subtotal() : this.cart.total()
  );

  protected shippingLabel = computed(() => {
    if (this.method() === 'retiro') return 'Retiro en tienda';
    return this.cart.shipping() === 0 ? 'Gratis' : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(this.cart.shipping());
  });

  async pay(e: Event) {
    e.preventDefault();
    if (!this.c.name || !this.c.email || !this.c.phone) {
      this.msg.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa nombre, email y teléfono.', life: 2800 });
      return;
    }
    if (this.method() === 'despacho' && (!this.c.region || !this.c.city || !this.c.address)) {
      this.msg.add({ severity: 'warn', summary: 'Falta la dirección', detail: 'Completa región, ciudad y dirección de despacho.', life: 2800 });
      return;
    }

    this.paying.set(true);
    const buyOrder = this.orders.newBuyOrder();
    // Guardamos el pedido para mostrarlo en la pantalla de resultado.
    sessionStorage.setItem('skold_last_order', JSON.stringify({
      buyOrder,
      customer: this.c,
      method: this.method(),
      items: this.cart.items().map((i) => ({ name: i.product.name, qty: i.quantity })),
      total: this.payable()
    }));

    this.orders.create({
      buyOrder,
      sessionId: 'sess-' + Date.now(),
      amount: this.payable(),
      returnUrl: window.location.origin + '/checkout/resultado'
    }).subscribe({
      next: (res) => this.redirectToWebpay(res.url, res.token),
      error: () => {
        this.paying.set(false);
        this.msg.add({
          severity: 'error',
          summary: 'No se pudo iniciar el pago',
          detail: '',
          life: 5000
        });
      }
    });
  }

  /** Webpay exige un POST con token_ws hacia su URL. */
  private redirectToWebpay(url: string, token: string) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }
}
