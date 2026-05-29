import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { TabsModule } from 'primeng/tabs';
import { MessageService } from 'primeng/api';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductCardComponent } from '../shared/product-card.component';
import { ClpPipe } from '../shared/clp.pipe';

@Component({
  selector: 'sk-product-detail',
  standalone: true,
  imports: [
    RouterLink, FormsModule, ButtonModule, RatingModule, GalleriaModule,
    TabsModule, ProductCardComponent, ClpPipe
  ],
  template: `
    @if (product(); as p) {
      <div class="sk-container">
        <nav class="crumbs">
          <a routerLink="/">Inicio</a> ›
          <a routerLink="/catalogo">Catálogo</a> ›
          <span>{{ p.name }}</span>
        </nav>

        <div class="top">
          <!-- Galería -->
          <div class="gallery">
            <p-galleria
              [value]="p.images"
              [numVisible]="4"
              [showThumbnails]="p.images.length > 1"
              [showItemNavigators]="p.images.length > 1"
              [circular]="true"
              [containerStyle]="{ borderRadius: '22px', overflow: 'hidden' }">
              <ng-template #item let-img>
                <img [src]="img" [alt]="p.name" style="width:100%;display:block;aspect-ratio:1;object-fit:cover" />
              </ng-template>
              <ng-template #thumbnail let-img>
                <img [src]="img" [alt]="p.name" style="width:64px;height:64px;object-fit:cover;border-radius:8px" />
              </ng-template>
            </p-galleria>
          </div>

          <!-- Info -->
          <div class="info">
            <div class="badges">
              @for (b of p.badges; track b) { <span class="sk-pill">{{ b }}</span> }
            </div>
            <span class="cat">{{ p.categoryLabel }} · {{ p.color }}</span>
            <h1>{{ p.name }}</h1>
            <p class="tag">{{ p.tagline }}</p>

            <div class="rating">
              <p-rating [ngModel]="p.rating" [readonly]="true" />
              <a routerLink="/resenas">{{ p.rating }} · {{ p.reviewsCount }} reseñas</a>
            </div>

            @if (p.powerKw > 0) {
              <ul class="keyspecs">
                <li><i class="pi pi-bolt"></i><strong>{{ p.powerKw }} kW</strong><span>Potencia</span></li>
                <li><i class="pi pi-home"></i><strong>{{ p.coverageM2 }} m²</strong><span>Superficie</span></li>
                <li><i class="pi pi-box"></i><strong>{{ p.hopperKg }} kg</strong><span>Tolva</span></li>
              </ul>
            }

            <div class="price-row">
              @if (p.oldPrice) { <span class="old">{{ p.oldPrice | clp }}</span> }
              <span class="price">{{ p.price | clp }}</span>
              @if (p.stock > 0) {
                <span class="stock ok"><i class="pi pi-check-circle"></i> En stock</span>
              } @else {
                <span class="stock no">Agotado</span>
              }
            </div>

            <div class="buy">
              <div class="qty">
                <button (click)="dec()" aria-label="Menos">−</button>
                <span>{{ qty() }}</span>
                <button (click)="inc(p.stock)" aria-label="Más">+</button>
              </div>
              <p-button label="Agregar al carrito" icon="pi pi-shopping-cart" size="large" [disabled]="p.stock === 0" (onClick)="add()" />
              <p-button label="Comprar ahora" icon="pi pi-bolt" size="large" severity="contrast" [outlined]="true" [disabled]="p.stock === 0" (onClick)="buyNow()" />
            </div>

            <ul class="perks">
              <li><i class="pi pi-truck"></i> Despacho a todo Chile</li>
              <li><i class="pi pi-shield"></i> Garantía {{ p.specs[p.specs.length-1].value }}</li>
              <li><i class="pi pi-wrench"></i> Instalación disponible</li>
            </ul>
          </div>
        </div>

        <!-- Tabs detalle -->
        <section class="detail">
          <p-tabs value="0">
            <p-tablist>
              <p-tab value="0">Descripción</p-tab>
              <p-tab value="1">Ficha técnica</p-tab>
              <p-tab value="2">Características</p-tab>
            </p-tablist>
            <p-tabpanels>
              <p-tabpanel value="0"><p class="prose">{{ p.description }}</p></p-tabpanel>
              <p-tabpanel value="1">
                <table class="specs">
                  @for (s of p.specs; track s.label) {
                    <tr><th>{{ s.label }}</th><td>{{ s.value }}</td></tr>
                  }
                </table>
              </p-tabpanel>
              <p-tabpanel value="2">
                <ul class="features">
                  @for (f of p.features; track f) { <li><i class="pi pi-check"></i> {{ f }}</li> }
                </ul>
              </p-tabpanel>
            </p-tabpanels>
          </p-tabs>
        </section>

        <!-- Relacionados -->
        @if (related().length) {
          <section class="related">
            <h2 class="sk-title">También te puede gustar</h2>
            <div class="sk-grid grid">
              @for (r of related(); track r.id) { <sk-product-card [product]="r" /> }
            </div>
          </section>
        }
      </div>
    } @else {
      <div class="sk-container notfound">
        <h1>Producto no encontrado</h1>
        <p-button label="Volver al catálogo" routerLink="/catalogo" />
      </div>
    }
  `,
  styles: [`
    .crumbs { padding: 1.4rem 0; color: var(--sk-muted); font-size: .86rem; }
    .crumbs a:hover { color: var(--sk-ember-deep); }
    .top { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; padding-bottom: 3rem; }
    .info .cat { font-size: .8rem; text-transform: uppercase; letter-spacing: .12em; color: var(--sk-muted); font-weight: 700; }
    .badges { display: flex; gap: .4rem; margin-bottom: .7rem; }
    .info h1 { font-size: clamp(1.9rem, 4vw, 2.8rem); margin: .3rem 0; }
    .tag { color: var(--sk-muted); font-size: 1.05rem; }
    .rating { display: flex; align-items: center; gap: .6rem; margin: .8rem 0 1.4rem; font-size: .9rem; }
    .rating a { color: var(--sk-muted); }
    .keyspecs { list-style: none; display: flex; gap: .7rem; padding: 0; margin: 0 0 1.5rem; }
    .keyspecs li { flex: 1; background: var(--sk-cream-2); border-radius: 14px; padding: .9rem; display: flex; flex-direction: column; }
    .keyspecs i { color: var(--sk-ember-deep); font-size: 1.1rem; margin-bottom: .3rem; }
    .keyspecs strong { font-family: var(--sk-font-display); font-size: 1.25rem; }
    .keyspecs span { font-size: .78rem; color: var(--sk-muted); }
    .price-row { display: flex; align-items: center; gap: .8rem; margin-bottom: 1.4rem; flex-wrap: wrap; }
    .price-row .old { text-decoration: line-through; color: var(--sk-muted); }
    .price-row .price { font-family: var(--sk-font-display); font-size: 2.1rem; font-weight: 700; }
    .stock { font-size: .85rem; font-weight: 600; }
    .stock.ok { color: var(--sk-pine); }
    .stock.no { color: #b00020; }
    .buy { display: flex; gap: .7rem; align-items: stretch; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .qty { display: flex; align-items: center; border: 1px solid var(--sk-sand); border-radius: 999px; overflow: hidden; }
    .qty button { width: 42px; height: 100%; border: 0; background: #fff; font-size: 1.3rem; cursor: pointer; color: var(--sk-iron); }
    .qty button:hover { background: var(--sk-cream-2); }
    .qty span { min-width: 36px; text-align: center; font-weight: 700; }
    .perks { list-style: none; padding: 1.2rem 0 0; margin: 0; border-top: 1px solid rgba(42,37,33,.1); display: flex; gap: 1.4rem; flex-wrap: wrap; font-size: .88rem; font-weight: 600; color: var(--sk-ink); }
    .perks i { color: var(--sk-ember-deep); margin-right: .35rem; }
    .detail { padding: 1rem 0 3rem; }
    .prose { line-height: 1.7; max-width: 70ch; color: var(--sk-ink); }
    .specs { width: 100%; max-width: 560px; border-collapse: collapse; }
    .specs tr { border-bottom: 1px solid rgba(42,37,33,.1); }
    .specs th { text-align: left; padding: .7rem 0; color: var(--sk-muted); font-weight: 600; }
    .specs td { text-align: right; padding: .7rem 0; font-weight: 600; }
    .features { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: .7rem; max-width: 640px; }
    .features i { color: var(--sk-pine); margin-right: .5rem; }
    .related { padding: 2rem 0 4rem; }
    .related .grid { grid-template-columns: repeat(3,1fr); margin-top: 1.5rem; }
    .notfound { padding: 5rem 0; text-align: center; }
    .notfound h1 { margin-bottom: 1.5rem; }
    @media (max-width: 860px) { .top { grid-template-columns: 1fr; } .related .grid { grid-template-columns: 1fr; } .features { grid-template-columns: 1fr; } }
  `]
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productSvc = inject(ProductService);
  private cart = inject(CartService);
  private msg = inject(MessageService);

  private slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });

  protected product = computed(() => this.productSvc.getBySlug(this.slug()));
  protected related = computed(() => {
    const p = this.product();
    return p ? this.productSvc.getRelated(p) : [];
  });

  protected qty = signal(1);

  inc(max: number) { this.qty.update((q) => Math.min(q + 1, max)); }
  dec() { this.qty.update((q) => Math.max(1, q - 1)); }

  add() {
    const p = this.product();
    if (!p) return;
    this.cart.add(p, this.qty());
    this.msg.add({ severity: 'success', summary: 'Agregado al carrito', detail: `${this.qty()} × ${p.name}`, life: 2200 });
  }

  buyNow() {
    this.add();
    this.router.navigate(['/carrito']);
  }
}
