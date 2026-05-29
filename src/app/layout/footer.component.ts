import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sk-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="ft">
      <div class="sk-container grid">
        <div class="col brand-col">
          <div class="brand">
            <img src="img/logo-mark.jpg" alt="" aria-hidden="true" width="34" height="34" />
            <span>SKOLD</span>
          </div>
          <p>Estufas y calefactores a pellet hechos a mano. Calor forjado para el Sur.</p>
          <div class="social">
            <a href="https://www.instagram.com/skold_estufaspellet/" target="_blank" rel="noopener" aria-label="Instagram"><i class="pi pi-instagram"></i></a>
            <a href="https://wa.me/56938659397" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="pi pi-whatsapp"></i></a>
            <a href="mailto:hola@skold.cl" aria-label="Email"><i class="pi pi-envelope"></i></a>
          </div>
        </div>

        <div class="col">
          <h4>Tienda</h4>
          <a routerLink="/producto/torre-de-llama">Torre de Llama</a>
          <a routerLink="/catalogo">Catálogo</a>
          <a routerLink="/galeria">Galería</a>
          <a routerLink="/resenas">Reseñas</a>
        </div>

        <div class="col">
          <h4>Empresa</h4>
          <a routerLink="/nosotros">Nosotros</a>
          <a routerLink="/galeria">Galería</a>
          <a routerLink="/resenas">Reseñas</a>
          <a routerLink="/contacto">Contacto</a>
        </div>

        <div class="col">
          <h4>Ayuda</h4>
          <a routerLink="/contacto">Asesoría de compra</a>
          <a routerLink="/contacto">Instalación</a>
          <a routerLink="/contacto">Garantía 3 años</a>
          <a routerLink="/contacto">Despacho a todo Chile</a>
        </div>
      </div>

      <div class="sk-container bottom">
        <span>© {{ year }} Skold Estufas a Pellet. Todos los derechos reservados.</span>
        <span class="pay"><i class="pi pi-credit-card"></i> Pago seguro con Webpay</span>
      </div>
    </footer>
  `,
  styles: [`
    .ft { background: var(--sk-iron); color: #cdbfae; padding-top: 3.5rem; }
    .grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; padding-bottom: 2.5rem; }
    .brand { display: flex; align-items: center; gap: .5rem; color: #fff; font-family: var(--sk-font-display); font-weight: 700; font-size: 1.4rem; letter-spacing: .12em; }
    .brand img { display: block; width: 34px; height: 34px; object-fit: cover; border-radius: 8px; box-shadow: inset 0 0 0 1px rgba(255,255,255,.08); }
    .brand-col p { margin: 1rem 0; max-width: 34ch; line-height: 1.6; font-size: .92rem; }
    .social { display: flex; gap: .6rem; }
    .social a { width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; background: rgba(255,255,255,.07); color: #fff; transition: background .2s; }
    .social a i { font-size: 1.1rem; line-height: 1; display: block; }
    .social a:hover { background: var(--sk-ember); }
    .col h4 { color: #fff; font-family: var(--sk-font-sans); font-size: .82rem; text-transform: uppercase; letter-spacing: .14em; margin-bottom: 1rem; }
    .col a { display: block; padding: .35rem 0; color: #cdbfae; font-size: .92rem; }
    .col a:hover { color: var(--sk-ember); }
    .bottom { display: flex; justify-content: space-between; align-items: center; padding: 1.3rem 0; border-top: 1px solid rgba(255,255,255,.08); font-size: .82rem; flex-wrap: wrap; gap: .6rem; }
    .pay { display: inline-flex; align-items: center; gap: .4rem; }
    @media (max-width: 760px) { .grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
  `]
})
export class FooterComponent {
  protected year = new Date().getFullYear();
}
