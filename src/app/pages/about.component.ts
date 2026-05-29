import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'sk-about',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  template: `
    <section class="hero">
      <div class="sk-container hero-inner">
        <div>
          <span class="sk-eyebrow" style="color:#f1a06f">Nosotros</span>
          <h1>Calor con propósito</h1>
          <p>Diseñamos y fabricamos a mano calefactores a pellet en Temuco. Calor forjado para el Sur: piezas robustas, probadas una a una, pensadas para la vida al aire libre.</p>
        </div>
        <img class="lockup" src="img/logo-full.jpg" alt="Logo Skold — Calor forjado para el Sur" />
      </div>
    </section>

    <section class="sk-section story">
      <div class="sk-container split">
        <div class="img" style="background-image:url('img/ig-maker.jpg')"></div>
        <div class="txt">
          <span class="sk-eyebrow">Nuestra historia</span>
          <h2 class="sk-title">Del frío del sur a tu patio</h2>
          <p>Skold —<em>sköld</em>, “escudo” en sueco— nació de una idea simple: protegerte del frío sin renunciar al carácter ni al oficio. En nuestro taller forjamos en acero cada calefactor a pellet, con la robustez que exige el sur de Chile.</p>
          <p>Nuestra torre de llama nace soldada a mano y se prueba —encendido, combustión y altura de llama— antes de pintarse y llegar a tu hogar. Calor forjado para el Sur, pieza por pieza.</p>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="sk-container grid">
        @for (s of stats; track s.label) {
          <div class="stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div>
        }
      </div>
    </section>

    <section class="sk-section values">
      <div class="sk-container">
        <span class="sk-eyebrow">Lo que nos mueve</span>
        <h2 class="sk-title">Nuestros valores</h2>
        <div class="grid3">
          @for (v of values; track v.title) {
            <div class="value">
              <span class="ic"><i class="pi" [class]="v.icon"></i></span>
              <h3>{{ v.title }}</h3>
              <p>{{ v.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="sk-container inner">
        <h2>Llevemos el calor Skold a tu hogar</h2>
        <p-button label="Ver catálogo" icon="pi pi-arrow-right" iconPos="right" size="large" routerLink="/catalogo" />
      </div>
    </section>
  `,
  styles: [`
    .hero { background: var(--sk-iron); color: #f7f3ec; padding-block: clamp(3rem,8vw,5.5rem); }
    .hero-inner { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2.5rem; align-items: center; }
    .hero h1 { font-size: clamp(2.4rem,6vw,4rem); margin: 1rem 0; }
    .hero p { max-width: 52ch; color: #d8cdbe; font-size: 1.1rem; line-height: 1.6; }
    .hero .lockup { width: 100%; max-width: 320px; justify-self: end; border-radius: var(--sk-radius-lg); box-shadow: var(--sk-shadow); }
    @media (max-width: 760px) { .hero-inner { grid-template-columns: 1fr; } .hero .lockup { max-width: 220px; justify-self: start; } }
    .story { background: #fff; }
    .split { display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: center; }
    .img { border-radius: var(--sk-radius-lg); aspect-ratio: 4/3; background-size: cover; background-position: center; box-shadow: var(--sk-shadow); }
    .txt p { color: var(--sk-muted); line-height: 1.7; margin-top: 1rem; }
    .stats { background: var(--sk-ember-deep); color: #fff; }
    .stats .grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; padding-block: 2.5rem; text-align: center; }
    .stat strong { display: block; font-family: var(--sk-font-display); font-size: 2.6rem; }
    .stat span { font-size: .9rem; opacity: .9; }
    .values { background: var(--sk-cream-2); }
    .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 2rem; }
    .value { background: #fff; border-radius: var(--sk-radius-lg); padding: 1.8rem; box-shadow: var(--sk-shadow-soft); }
    .ic { width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center; background: rgba(226,87,30,.1); color: var(--sk-ember-deep); font-size: 1.4rem; margin-bottom: .9rem; }
    .value p { color: var(--sk-muted); line-height: 1.6; margin: .4rem 0 0; }
    .cta { background: var(--sk-iron); color: #fff; }
    .cta .inner { display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; padding-block: 3rem; flex-wrap: wrap; }
    .cta h2 { font-size: clamp(1.6rem,3.5vw,2.4rem); }
    @media (max-width: 860px) { .split { grid-template-columns: 1fr; } .stats .grid { grid-template-columns: repeat(2,1fr); } .grid3 { grid-template-columns: 1fr; } }
  `]
})
export class AboutComponent {
  protected stats = [
    { value: '100%', label: 'Hecha a mano' },
    { value: '0', label: 'Electricidad necesaria' },
    { value: 'Temuco', label: 'Fabricación propia' },
    { value: '4.9★', label: 'Satisfacción' }
  ];
  protected values = [
    { icon: 'pi-leaf', title: 'Sustentabilidad', text: 'Promovemos la biomasa renovable y la combustión limpia para un aire más sano.' },
    { icon: 'pi-heart', title: 'Cercanía', text: 'Asesoría humana y honesta: te ayudamos a elegir lo que realmente necesitas.' },
    { icon: 'pi-verified', title: 'Oficio', text: 'Cada torre se suelda y se prueba a mano antes de entregarse. Calidad de taller, no de línea.' }
  ];
}
