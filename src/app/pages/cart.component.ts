import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../services/cart.service';
import { ClpPipe } from '../shared/clp.pipe';

@Component({
  selector: 'sk-cart',
  standalone: true,
  imports: [RouterLink, ButtonModule, ClpPipe],
  template: `
    <div class="sk-container wrap">
      <h1 class="sk-title">Tu carrito</h1>

      @if (cart.items().length) {
        <div class="layout">
          <section class="items">
            @for (item of cart.items(); track item.product.id) {
              <article class="item">
                <a [routerLink]="['/producto', item.product.slug]" class="thumb">
                  <img [src]="item.product.images[0]" [alt]="item.product.name" />
                </a>
                <div class="meta">
                  <a [routerLink]="['/producto', item.product.slug]"><h3>{{ item.product.name }}</h3></a>
                  <span class="sub">{{ item.product.categoryLabel }} · {{ item.product.color }}</span>
                  <button class="remove" (click)="cart.remove(item.product.id)"><i class="pi pi-trash"></i> Quitar</button>
                </div>
                <div class="qty">
                  <button (click)="cart.setQuantity(item.product.id, item.quantity - 1)" aria-label="Menos">−</button>
                  <span>{{ item.quantity }}</span>
                  <button (click)="cart.setQuantity(item.product.id, item.quantity + 1)" aria-label="Más">+</button>
                </div>
                <div class="line">{{ item.product.price * item.quantity | clp }}</div>
              </article>
            }
            <button class="clear" (click)="cart.clear()"><i class="pi pi-times"></i> Vaciar carrito</button>
          </section>

          <aside class="summary">
            <h3>Resumen</h3>
            <div class="row"><span>Subtotal</span><span>{{ cart.subtotal() | clp }}</span></div>
            <div class="row">
              <span>Despacho</span>
              <span>{{ cart.shipping() === 0 ? 'Gratis' : (cart.shipping() | clp) }}</span>
            </div>
            @if (cart.shipping() > 0) {
              <p class="freehint"><i class="pi pi-info-circle"></i> Despacho gratis en compras sobre {{ 500000 | clp }}.</p>
            }
            <div class="row total"><span>Total</span><span>{{ cart.total() | clp }}</span></div>
            <p-button label="Ir a pagar" icon="pi pi-lock" iconPos="left" size="large" styleClass="w-full" routerLink="/checkout" />
            <a routerLink="/catalogo" class="continue">← Seguir comprando</a>
            <p class="secure"><i class="pi pi-shield"></i> Pago protegido con Webpay</p>
          </aside>
        </div>
      } @else {
        <div class="empty">
          <i class="pi pi-shopping-cart"></i>
          <h2>Tu carrito está vacío</h2>
          <p>Descubre nuestras estufas a pellet de diseño nórdico.</p>
          <p-button label="Ver catálogo" icon="pi pi-arrow-right" iconPos="right" routerLink="/catalogo" />
        </div>
      }
    </div>
  `,
  styles: [`
    .wrap { padding-block: 2.5rem 4rem; }
    .sk-title { margin-bottom: 1.8rem; }
    .layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }
    .items { display: flex; flex-direction: column; gap: 1rem; }
    .item { display: grid; grid-template-columns: 92px 1fr auto auto; gap: 1rem; align-items: center; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius); padding: .9rem; }
    .thumb img { width: 92px; height: 92px; object-fit: cover; border-radius: 10px; }
    .meta h3 { font-size: 1.1rem; }
    .meta .sub { font-size: .82rem; color: var(--sk-muted); }
    .remove { display: block; margin-top: .5rem; background: none; border: 0; color: var(--sk-muted); cursor: pointer; font-size: .82rem; padding: 0; }
    .remove:hover { color: #b00020; }
    .qty { display: flex; align-items: center; border: 1px solid var(--sk-sand); border-radius: 999px; }
    .qty button { width: 34px; height: 34px; border: 0; background: transparent; font-size: 1.1rem; cursor: pointer; }
    .qty span { min-width: 28px; text-align: center; font-weight: 700; }
    .line { font-family: var(--sk-font-display); font-weight: 600; font-size: 1.1rem; min-width: 90px; text-align: right; }
    .clear { align-self: flex-start; background: none; border: 0; color: var(--sk-muted); cursor: pointer; margin-top: .5rem; font-size: .88rem; }
    .clear:hover { color: #b00020; }
    .summary { position: sticky; top: 88px; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.5rem; box-shadow: var(--sk-shadow-soft); }
    .summary h3 { margin-bottom: 1rem; }
    .row { display: flex; justify-content: space-between; padding: .5rem 0; color: var(--sk-muted); }
    .row.total { border-top: 1px solid rgba(42,37,33,.12); margin-top: .5rem; padding-top: 1rem; color: var(--sk-iron); font-weight: 700; font-size: 1.3rem; }
    .row.total span:last-child { font-family: var(--sk-font-display); }
    .freehint { font-size: .8rem; color: var(--sk-ember-deep); margin: .2rem 0 .5rem; }
    .continue { display: block; text-align: center; margin-top: 1rem; color: var(--sk-muted); font-weight: 600; }
    .continue:hover { color: var(--sk-ember-deep); }
    .secure { text-align: center; font-size: .8rem; color: var(--sk-muted); margin-top: 1rem; }
    .empty { text-align: center; padding: 4rem 1rem; }
    .empty i { font-size: 3rem; color: var(--sk-sand); display: block; margin-bottom: 1rem; }
    .empty h2 { margin-bottom: .5rem; }
    .empty p { color: var(--sk-muted); margin-bottom: 1.5rem; }
    :host ::ng-deep .w-full { width: 100%; }
    @media (max-width: 820px) {
      .layout { grid-template-columns: 1fr; }
      .summary { position: static; }
      .item { grid-template-columns: 72px 1fr auto; }
      .item .line { grid-column: 2 / -1; text-align: left; }
    }
  `]
})
export class CartComponent {
  protected cart = inject(CartService);
}
