import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../services/cart.service';
import { ClpPipe } from '../shared/clp.pipe';

type Status = 'success' | 'rejected' | 'aborted' | 'error' | 'unknown';

@Component({
  selector: 'sk-checkout-result',
  standalone: true,
  imports: [RouterLink, ButtonModule, ClpPipe],
  template: `
    <div class="sk-container wrap">
      <div class="card" [class]="status()">
        <span class="icon">
          <i class="pi" [class.pi-check-circle]="status()==='success'"
                        [class.pi-times-circle]="status()==='rejected' || status()==='error'"
                        [class.pi-info-circle]="status()==='aborted' || status()==='unknown'"></i>
        </span>

        @switch (status()) {
          @case ('success') {
            <h1>¡Pago aprobado! 🎉</h1>
            <p>Gracias por tu compra. Te enviamos un correo con el detalle y nos contactaremos para coordinar la entrega.</p>
          }
          @case ('rejected') {
            <h1>Pago rechazado</h1>
            <p>Tu pago no pudo ser procesado. Revisa los datos de tu tarjeta o intenta con otro medio de pago.</p>
          }
          @case ('aborted') {
            <h1>Pago cancelado</h1>
            <p>Cancelaste el proceso de pago. Tu carrito sigue disponible cuando quieras retomarlo.</p>
          }
          @default {
            <h1>No pudimos confirmar el pago</h1>
            <p>Ocurrió un problema al procesar la transacción. Si el cobro se realizó, contáctanos y lo verificamos.</p>
          }
        }

        @if (status() === 'success') {
          <dl class="detail">
            @if (order()?.buyOrder || buyOrder()) { <div><dt>N° de orden</dt><dd>{{ order()?.buyOrder || buyOrder() }}</dd></div> }
            @if (amount()) { <div><dt>Monto</dt><dd>{{ amount() | clp }}</dd></div> }
            @if (auth()) { <div><dt>Código de autorización</dt><dd>{{ auth() }}</dd></div> }
            @if (card()) { <div><dt>Tarjeta</dt><dd>•••• {{ card() }}</dd></div> }
          </dl>
        }

        <div class="actions">
          @if (status() === 'success') {
            <p-button label="Volver al inicio" icon="pi pi-home" routerLink="/" />
            <p-button label="Seguir comprando" [outlined]="true" routerLink="/catalogo" />
          } @else if (status() === 'aborted' || status() === 'rejected') {
            <p-button label="Volver al carrito" icon="pi pi-shopping-cart" routerLink="/carrito" />
            <p-button label="Catálogo" [outlined]="true" routerLink="/catalogo" />
          } @else {
            <p-button label="Contáctanos" icon="pi pi-whatsapp" routerLink="/contacto" />
            <p-button label="Inicio" [outlined]="true" routerLink="/" />
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wrap { padding-block: 4rem 5rem; display: grid; place-items: center; }
    .card { max-width: 520px; width: 100%; text-align: center; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 2.5rem; box-shadow: var(--sk-shadow); }
    .icon { width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 1.2rem; font-size: 2.4rem; }
    .success .icon { background: rgba(47,79,58,.12); color: var(--sk-pine); }
    .rejected .icon, .error .icon { background: rgba(176,0,32,.1); color: #b00020; }
    .aborted .icon, .unknown .icon { background: rgba(226,87,30,.1); color: var(--sk-ember-deep); }
    h1 { font-size: 1.8rem; margin-bottom: .6rem; }
    .card > p { color: var(--sk-muted); line-height: 1.6; max-width: 42ch; margin: 0 auto; }
    .detail { margin: 1.6rem 0; text-align: left; background: var(--sk-cream-2); border-radius: 14px; padding: 1.1rem 1.3rem; }
    .detail div { display: flex; justify-content: space-between; padding: .35rem 0; }
    .detail dt { color: var(--sk-muted); }
    .detail dd { margin: 0; font-weight: 600; }
    .actions { display: flex; gap: .7rem; justify-content: center; margin-top: 1.6rem; flex-wrap: wrap; }
  `]
})
export class CheckoutResultComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cart = inject(CartService);

  protected status = signal<Status>('unknown');
  protected buyOrder = signal('');
  protected amount = signal(0);
  protected auth = signal('');
  protected card = signal('');
  protected order = signal<{ buyOrder: string } | null>(null);

  ngOnInit(): void {
    const q = this.route.snapshot.queryParamMap;
    const s = (q.get('status') as Status) || 'unknown';
    this.status.set(s);
    this.buyOrder.set(q.get('buyOrder') || '');
    this.amount.set(Number(q.get('amount')) || 0);
    this.auth.set(q.get('auth') || '');
    this.card.set(q.get('card') || '');

    const raw = sessionStorage.getItem('skold_last_order');
    if (raw) {
      try { this.order.set(JSON.parse(raw)); } catch { /* noop */ }
    }

    if (s === 'success') {
      this.cart.clear();
      sessionStorage.removeItem('skold_last_order');
    }
  }
}
