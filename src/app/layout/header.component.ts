import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'sk-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BadgeModule],
  template: `
    <header class="hdr" [class.scrolled]="true">
      <div class="sk-container bar">
        <a routerLink="/" class="brand" aria-label="Skold inicio">
          <img class="crest" src="img/logo-mark.jpg" alt="" aria-hidden="true" width="38" height="38" />
          <span class="lockup">
            <span class="word">SKOLD</span>
            <span class="slogan">Calor forjado para el Sur</span>
          </span>
        </a>

        <nav class="nav" [class.open]="menuOpen()">
          <a routerLink="/catalogo" routerLinkActive="active" (click)="close()">Catálogo</a>
          <a routerLink="/galeria" routerLinkActive="active" (click)="close()">Galería</a>
          <a routerLink="/resenas" routerLinkActive="active" (click)="close()">Reseñas</a>
          <a routerLink="/nosotros" routerLinkActive="active" (click)="close()">Nosotros</a>
          <a routerLink="/contacto" routerLinkActive="active" (click)="close()">Contacto</a>
        </nav>

        <div class="actions">
          <a routerLink="/carrito" class="cart" aria-label="Ver carrito">
            <i class="pi pi-shopping-cart"></i>
            @if (cart.count() > 0) {
              <span class="dot">{{ cart.count() }}</span>
            }
          </a>
          <button class="burger" (click)="toggle()" aria-label="Menú">
            <i class="pi" [class.pi-bars]="!menuOpen()" [class.pi-times]="menuOpen()"></i>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .hdr {
      position: sticky; top: 0; z-index: 50;
      background: rgba(26,22,20,.92);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,.08);
      color: #f7f3ec;
    }
    .bar { display: flex; align-items: center; gap: 1.5rem; height: 68px; }
    .brand { display: flex; align-items: center; gap: .6rem; margin-right: auto; }
    .crest { width: 38px; height: 38px; display: block; object-fit: cover; border-radius: 9px; box-shadow: 0 2px 8px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.08); }
    .lockup { display: flex; flex-direction: column; line-height: 1; }
    .word { font-family: var(--sk-font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: .18em; }
    .slogan { font-size: .56rem; text-transform: uppercase; letter-spacing: .26em; color: #b9ad9c; margin-top: .22rem; }
    @media (max-width: 420px) { .slogan { display: none; } }
    .nav { display: flex; gap: 1.7rem; }
    .nav a {
      font-weight: 600; font-size: .94rem; color: #e7ded2; opacity: .85;
      position: relative; padding: .2rem 0;
    }
    .nav a:hover { opacity: 1; }
    .nav a.active { opacity: 1; }
    .nav a.active::after {
      content: ''; position: absolute; left: 0; right: 0; bottom: -4px;
      height: 2px; background: var(--sk-ember); border-radius: 2px;
    }
    .actions { display: flex; align-items: center; gap: .5rem; }
    .cart { position: relative; display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; }
    .cart:hover { background: rgba(255,255,255,.08); }
    .cart i { font-size: 1.2rem; }
    .dot {
      position: absolute; top: 2px; right: 2px;
      background: var(--sk-ember); color: #fff;
      min-width: 18px; height: 18px; padding: 0 4px;
      border-radius: 999px; font-size: .68rem; font-weight: 700;
      display: grid; place-items: center;
    }
    .burger { display: none; background: none; border: 0; color: #fff; font-size: 1.3rem; cursor: pointer; }

    @media (max-width: 860px) {
      .nav {
        position: absolute; top: 68px; left: 0; right: 0;
        flex-direction: column; gap: 0;
        background: var(--sk-iron);
        border-bottom: 1px solid rgba(255,255,255,.08);
        max-height: 0; overflow: hidden; transition: max-height .3s ease;
      }
      .nav.open { max-height: 340px; }
      .nav a { padding: 1rem 1.4rem; border-top: 1px solid rgba(255,255,255,.06); }
      .burger { display: block; }
    }
  `]
})
export class HeaderComponent {
  protected cart = inject(CartService);
  protected menuOpen = signal(false);
  toggle() { this.menuOpen.update((v) => !v); }
  close() { this.menuOpen.set(false); }
}
