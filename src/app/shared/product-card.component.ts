import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ClpPipe } from './clp.pipe';

@Component({
  selector: 'sk-product-card',
  standalone: true,
  imports: [RouterLink, RatingModule, ButtonModule, FormsModule, ClpPipe],
  template: `
    <article class="card">
      <a class="media" [routerLink]="['/producto', product().slug]">
        @for (badge of product().badges; track badge) {
          <span class="badge" [class.badge--offer]="badge === 'Oferta'">{{ badge }}</span>
        }
        <img [src]="product().images[0]" [alt]="product().name" loading="lazy" />
      </a>
      <div class="body">
        <span class="cat">{{ product().categoryLabel }}</span>
        <h3><a [routerLink]="['/producto', product().slug]">{{ product().name }}</a></h3>
        <p class="tagline">{{ product().tagline }}</p>

        @if (product().powerKw > 0) {
          <ul class="meta">
            <li><i class="pi pi-bolt"></i> {{ product().powerKw }} kW</li>
            <li><i class="pi pi-home"></i> {{ product().coverageM2 }} m²</li>
          </ul>
        }

        <div class="rating">
          <p-rating [ngModel]="product().rating" [readonly]="true" />
          <span>{{ product().rating }} ({{ product().reviewsCount }})</span>
        </div>

        <div class="foot">
          <div class="prices">
            @if (product().oldPrice) {
              <span class="old">{{ product().oldPrice | clp }}</span>
            }
            <span class="price">{{ product().price | clp }}</span>
          </div>
          <p-button
            icon="pi pi-shopping-cart"
            [rounded]="true"
            severity="contrast"
            ariaLabel="Agregar al carrito"
            (onClick)="addToCart()" />
        </div>
      </div>
    </article>
  `,
  styles: [`
    .card {
      display: flex;
      flex-direction: column;
      background: #fff;
      border: 1px solid rgba(42,37,33,.08);
      border-radius: var(--sk-radius-lg);
      overflow: hidden;
      box-shadow: var(--sk-shadow-soft);
      transition: transform .25s ease, box-shadow .25s ease;
      height: 100%;
    }
    .card:hover { transform: translateY(-4px); box-shadow: var(--sk-shadow); }
    .media {
      position: relative;
      display: block;
      aspect-ratio: 1;
      background: var(--sk-cream-2);
    }
    .media img { width: 100%; height: 100%; object-fit: cover; }
    .badge {
      position: absolute; top: .7rem; left: .7rem;
      background: var(--sk-iron); color: #fff;
      font-size: .68rem; font-weight: 700; letter-spacing: .05em;
      text-transform: uppercase;
      padding: .3rem .6rem; border-radius: 999px;
      backdrop-filter: blur(4px);
    }
    .badge + .badge { top: 2.7rem; }
    .badge--offer { background: var(--sk-ember); }
    .body { display: flex; flex-direction: column; gap: .45rem; padding: 1.1rem 1.2rem 1.3rem; flex: 1; }
    .cat { font-size: .72rem; text-transform: uppercase; letter-spacing: .14em; color: var(--sk-muted); font-weight: 700; }
    h3 { font-size: 1.25rem; }
    .tagline { color: var(--sk-muted); font-size: .92rem; margin: 0; line-height: 1.4; flex: 1; }
    .meta { display: flex; gap: 1rem; list-style: none; margin: .2rem 0 0; padding: 0; color: var(--sk-ink); font-size: .85rem; font-weight: 600; }
    .meta i { color: var(--sk-ember-deep); margin-right: .25rem; }
    .rating { display: flex; align-items: center; gap: .5rem; font-size: .82rem; color: var(--sk-muted); }
    .foot { display: flex; align-items: center; justify-content: space-between; margin-top: .6rem; }
    .prices { display: flex; flex-direction: column; }
    .old { text-decoration: line-through; color: var(--sk-muted); font-size: .82rem; }
    .price { font-family: var(--sk-font-display); font-size: 1.35rem; font-weight: 600; color: var(--sk-iron); }
  `]
})
export class ProductCardComponent {
  product = input.required<Product>();
  protected cart = inject(CartService);
  private msg = inject(MessageService);

  addToCart(): void {
    this.cart.add(this.product());
    this.msg.add({
      severity: 'success',
      summary: 'Agregado al carrito',
      detail: this.product().name,
      life: 2200
    });
  }
}
