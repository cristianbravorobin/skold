import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { ProductCardComponent } from '../shared/product-card.component';

@Component({
  selector: 'sk-home',
  standalone: true,
  imports: [RouterLink, DecimalPipe, ButtonModule, RatingModule, FormsModule, ProductCardComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero__bg" style="background-image:url('img/ig-lifestyle.jpg')"></div>
      <div class="sk-container hero__inner">
        <span class="sk-pill"><i class="pi pi-star-fill"></i> {{ reviews.average() | number:'1.1-1' }} · {{ reviews.count() }}+ hogares</span>
        <h1>Calor forjado<br>para el sur</h1>
        <p>Estufas y calefactores a pellet hechos a mano en Temuco. Nuestra torre de llama calienta tu terraza, patio o quincho con una espectacular columna de fuego. Cada pieza se prueba antes de llegar a tu hogar.</p>
        <div class="hero__cta">
          <p-button label="Ver catálogo" icon="pi pi-arrow-right" iconPos="right" size="large" routerLink="/catalogo" />
          <p-button label="Asesoría gratis" [outlined]="true" size="large" severity="contrast" routerLink="/contacto" />
        </div>
        <ul class="hero__trust">
          <li><i class="pi pi-wrench"></i> Hecho a mano</li>
          <li><i class="pi pi-power-off"></i> Funciona sin electricidad</li>
          <li><i class="pi pi-truck"></i> Despacho a todo Chile</li>
        </ul>
      </div>
    </section>

    <!-- VALUE PROPS -->
    <section class="sk-section values">
      <div class="sk-container sk-grid cols-4">
        @for (v of valueProps; track v.title) {
          <div class="value">
            <span class="value__ic"><i class="pi" [class]="v.icon"></i></span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
          </div>
        }
      </div>
    </section>

    <!-- FEATURED -->
    <section class="sk-section featured">
      <div class="sk-container">
        <header class="head">
          <div>
            <span class="sk-eyebrow">Lo más elegido</span>
            <h2 class="sk-title">Modelos destacados</h2>
          </div>
          <p-button label="Ver todo el catálogo" [text]="true" icon="pi pi-arrow-right" iconPos="right" routerLink="/catalogo" />
        </header>
        <div class="sk-grid cols-3">
          @for (p of featured; track p.id) {
            <sk-product-card [product]="p" />
          }
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="sk-section how">
      <div class="sk-container">
        <div class="how__head">
          <span class="sk-eyebrow">Simple y eficiente</span>
          <h2 class="sk-title">¿Por qué pellet?</h2>
          <p class="sk-lead">El pellet es madera prensada de alto poder calorífico. Más barato que el gas, más limpio que la leña y perfecto para disfrutar al aire libre.</p>
        </div>
        <div class="sk-grid cols-3 steps">
          @for (s of steps; track s.n) {
            <div class="step">
              <span class="step__n">{{ s.n }}</span>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- REVIEWS TEASER -->
    <section class="sk-section quotes">
      <div class="sk-container">
        <header class="head center">
          <div>
            <span class="sk-eyebrow">Reseñas verificadas</span>
            <h2 class="sk-title">Lo que dicen nuestros clientes</h2>
          </div>
        </header>
        <div class="sk-grid cols-3">
          @for (r of topReviews; track r.id) {
            <figure class="quote">
              <p-rating [ngModel]="r.rating" [readonly]="true" />
              <blockquote>“{{ r.body }}”</blockquote>
              <figcaption>
                <span class="av" [style.background]="r.avatarColor">{{ r.author[0] }}</span>
                <span><strong>{{ r.author }}</strong><br><small>{{ r.location }}</small></span>
              </figcaption>
            </figure>
          }
        </div>
        <div class="center mt">
          <p-button label="Ver todas las reseñas" [outlined]="true" routerLink="/resenas" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="sk-container cta__inner">
        <div>
          <h2>¿No sabes qué potencia necesitas?</h2>
          <p>Cuéntanos los metros cuadrados de tu hogar y te recomendamos el modelo ideal, sin compromiso.</p>
        </div>
        <p-button label="Hablar con un asesor" icon="pi pi-whatsapp" size="large" routerLink="/contacto" />
      </div>
    </section>
  `,
  styles: [`
    /* hero */
    .hero { position: relative; background: var(--sk-iron); color: #f7f3ec; overflow: hidden; }
    .hero__bg { position: absolute; inset: 0; background-size: cover; background-position: center right; opacity: .9; }
    .hero__bg::after { content:''; position:absolute; inset:0; background: linear-gradient(100deg, var(--sk-iron) 32%, rgba(26,22,20,.4) 70%, transparent); }
    .hero__inner { position: relative; padding-block: clamp(3.5rem, 10vw, 7rem); max-width: 660px; }
    .hero h1 { font-size: clamp(2.6rem, 7vw, 4.6rem); margin: 1.1rem 0; }
    .hero p { font-size: 1.12rem; line-height: 1.6; color: #d8cdbe; max-width: 48ch; }
    .hero__cta { display: flex; gap: .8rem; margin-top: 1.8rem; flex-wrap: wrap; }
    .hero__trust { display: flex; gap: 1.6rem; list-style: none; padding: 0; margin: 2.2rem 0 0; flex-wrap: wrap; color: #cdbfae; font-size: .9rem; font-weight: 600; }
    .hero__trust i { color: var(--sk-ember); margin-right: .4rem; }

    .sk-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
    .sk-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }

    /* values */
    .values { background: #fff; }
    .value__ic { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: rgba(226,87,30,.1); color: var(--sk-ember-deep); font-size: 1.4rem; margin-bottom: .9rem; }
    .value h3 { font-size: 1.2rem; margin-bottom: .4rem; }
    .value p { color: var(--sk-muted); line-height: 1.55; margin: 0; font-size: .94rem; }

    .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
    .head.center { justify-content: center; text-align: center; }

    /* how */
    .how { background: var(--sk-cream-2); }
    .how__head { max-width: 60ch; margin-bottom: 2.5rem; }
    .step { background: #fff; border-radius: var(--sk-radius-lg); padding: 1.8rem; box-shadow: var(--sk-shadow-soft); }
    .step__n { font-family: var(--sk-font-display); font-size: 2.4rem; color: var(--sk-ember); font-weight: 700; }
    .step h3 { margin: .4rem 0; }
    .step p { color: var(--sk-muted); margin: 0; line-height: 1.55; }

    /* quotes */
    .quotes { background: #fff; }
    .quote { background: var(--sk-cream); border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.6rem; margin: 0; }
    .quote blockquote { margin: .8rem 0; line-height: 1.6; font-size: .98rem; }
    .quote figcaption { display: flex; align-items: center; gap: .7rem; font-size: .9rem; }
    .av { width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-weight: 700; }
    .mt { margin-top: 2rem; }
    .center { text-align: center; }

    /* cta */
    .cta { background: var(--sk-iron); color: #fff; }
    .cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding-block: clamp(2.5rem, 6vw, 4rem); flex-wrap: wrap; }
    .cta h2 { font-size: clamp(1.6rem, 3.5vw, 2.4rem); }
    .cta p { color: #cdbfae; margin: .6rem 0 0; max-width: 46ch; }

    @media (max-width: 980px) { .sk-grid.cols-4 { grid-template-columns: repeat(2,1fr); } .sk-grid.cols-3 { grid-template-columns: repeat(2,1fr); } }
    @media (max-width: 620px) { .sk-grid.cols-4, .sk-grid.cols-3 { grid-template-columns: 1fr; } }
  `]
})
export class HomeComponent {
  private products = inject(ProductService);
  protected reviews = inject(ReviewService);

  protected featured = this.products.getFeatured().slice(0, 3);
  protected topReviews = this.reviews.reviews().filter((r) => r.rating === 5).slice(0, 3);

  protected valueProps = [
    { icon: 'pi-power-off', title: 'Sin electricidad', text: 'Funciona por tiraje natural. Solo pellet: sin enchufes, sin cables.' },
    { icon: 'pi-eye', title: 'Llama que enamora', text: 'Una columna de fuego vertical, visible a través del tubo de vidrio templado.' },
    { icon: 'pi-wrench', title: 'Hecho a mano', text: 'Forjada y soldada a mano en Temuco. Cada pieza se prueba antes de entregar.' },
    { icon: 'pi-sun', title: 'Para el sur', text: 'Estructura robusta de acero, pensada para la terraza y el frío del sur.' }
  ];

  protected steps = [
    { n: '01', title: 'Cargas el pellet', text: 'Llenas la tolva con pellet de madera. Sin gas, sin leña húmeda, sin humo molesto.' },
    { n: '02', title: 'Enciendes y listo', text: 'Prende por tiraje natural, sin electricidad. En minutos tienes tu columna de fuego.' },
    { n: '03', title: 'Calor y ambiente', text: 'La llama vertical calienta tu terraza y se convierte en el centro de la reunión.' }
  ];
}
