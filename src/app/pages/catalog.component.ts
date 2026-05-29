import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../shared/product-card.component';
import { ProductCategory } from '../models/product.model';

@Component({
  selector: 'sk-catalog',
  standalone: true,
  imports: [FormsModule, RouterLink, SelectModule, ProductCardComponent],
  template: `
    <header class="page-hero">
      <div class="sk-container">
        <span class="sk-eyebrow">Catálogo</span>
        <h1 class="sk-title">La Torre de Llama</h1>
        <p class="sk-lead">Nuestra estufa a pellet hecho a mano funciona sin electricidad, con despacho a todo Chile.</p>
      </div>
    </header>

    <div class="sk-container layout">
      <!-- Filtros -->
      <aside class="filters">
        <div class="field">
          <label>Buscar</label>
          <span class="search">
            <i class="pi pi-search"></i>
            <input type="text" placeholder="Modelo, color…" [ngModel]="query()" (ngModelChange)="query.set($event)" />
          </span>
        </div>

        <div class="field">
          <label>Categoría</label>
          <div class="chips">
            <button [class.on]="category() === 'all'" (click)="category.set('all')">Todas</button>
            @for (c of categories; track c.value) {
              <button [class.on]="category() === c.value" (click)="category.set(c.value)">{{ c.label }}</button>
            }
          </div>
        </div>

        <div class="field">
          <label>Ordenar por</label>
          <p-select [options]="sortOptions" [ngModel]="sort()" (ngModelChange)="sort.set($event)" optionLabel="label" optionValue="value" styleClass="w-full" appendTo="body" />
        </div>

        <div class="hint">
          <i class="pi pi-info-circle"></i>
          ¿Dudas con la potencia? Regla simple: ~0,1 kW por m². <a routerLink="/contacto">Pídenos asesoría →</a>
        </div>
      </aside>

      <!-- Resultados -->
      <section class="results">
        <p class="count">{{ filtered().length }} producto(s)</p>
        @if (filtered().length) {
          <div class="sk-grid grid">
            @for (p of filtered(); track p.id) {
              <sk-product-card [product]="p" />
            }
          </div>
        } @else {
          <div class="empty">
            <i class="pi pi-search"></i>
            <p>No encontramos productos con esos filtros.</p>
          </div>
        }
      </section>
    </div>
  `,
  styles: [`
    .page-hero { background: var(--sk-cream-2); padding-block: clamp(2.5rem, 6vw, 4rem); }
    .layout { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; padding-block: 2.5rem; align-items: start; }
    .filters { position: sticky; top: 88px; display: flex; flex-direction: column; gap: 1.5rem; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.4rem; }
    .field label { display: block; font-weight: 700; font-size: .82rem; text-transform: uppercase; letter-spacing: .1em; color: var(--sk-muted); margin-bottom: .6rem; }
    .search { display: flex; align-items: center; gap: .5rem; border: 1px solid var(--sk-sand); border-radius: 10px; padding: .55rem .7rem; }
    .search i { color: var(--sk-muted); }
    .search input { border: 0; outline: 0; width: 100%; font-size: .95rem; background: transparent; }
    .chips { display: flex; flex-wrap: wrap; gap: .45rem; }
    .chips button { border: 1px solid var(--sk-sand); background: #fff; border-radius: 999px; padding: .4rem .8rem; font-size: .85rem; font-weight: 600; cursor: pointer; color: var(--sk-ink); transition: all .15s; }
    .chips button:hover { border-color: var(--sk-ember); }
    .chips button.on { background: var(--sk-iron); color: #fff; border-color: var(--sk-iron); }
    .hint { font-size: .85rem; color: var(--sk-muted); line-height: 1.5; background: rgba(226,87,30,.07); padding: .9rem; border-radius: 12px; }
    .hint a { color: var(--sk-ember-deep); font-weight: 600; }
    .count { color: var(--sk-muted); font-weight: 600; margin: 0 0 1rem; }
    .grid { grid-template-columns: repeat(3, 1fr); }
    .empty { text-align: center; padding: 4rem 1rem; color: var(--sk-muted); }
    .empty i { font-size: 2.5rem; display: block; margin-bottom: 1rem; }
    :host ::ng-deep .w-full { width: 100%; }
    @media (max-width: 1080px) { .grid { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 820px) {
      .layout { grid-template-columns: 1fr; }
      .filters { position: static; }
    }
    @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class CatalogComponent {
  private productSvc = inject(ProductService);

  protected categories = this.productSvc.getCategories();
  protected query = signal('');
  protected category = signal<ProductCategory | 'all'>('all');
  protected sort = signal('relevance');

  protected sortOptions = [
    { label: 'Relevancia', value: 'relevance' },
    { label: 'Precio: menor a mayor', value: 'price-asc' },
    { label: 'Precio: mayor a menor', value: 'price-desc' },
    { label: 'Mejor evaluados', value: 'rating' }
  ];

  // sort es un input bindeado, lo convertimos en signal vía getter
  private all = this.productSvc.getAll();

  protected filtered = computed(() => {
    const q = this.query().toLowerCase().trim();
    const cat = this.category();
    let list = this.all.filter((p) => {
      const matchCat = cat === 'all' || p.category === cat;
      const matchQ = !q || (p.name + p.color + p.tagline + p.categoryLabel).toLowerCase().includes(q);
      return matchCat && matchQ;
    });
    switch (this.sort()) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  });
}
