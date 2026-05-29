import { Component, computed, signal } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { GALLERY, GalleryItem } from '../data/gallery.data';

@Component({
  selector: 'sk-gallery',
  standalone: true,
  imports: [GalleriaModule],
  template: `
    <header class="page-hero">
      <div class="sk-container">
        <span class="sk-eyebrow">Galería</span>
        <h1 class="sk-title">Hogares Skold</h1>
        <p class="sk-lead">Instalaciones reales, modelos y ambientes. Inspírate para encontrar la estufa perfecta para tu espacio.</p>
      </div>
    </header>

    <div class="sk-container body">
      <div class="tabs">
        <button [class.on]="tag() === 'all'" (click)="tag.set('all')">Todo</button>
        @for (t of tags; track t) {
          <button [class.on]="tag() === t" (click)="tag.set(t)">{{ t }}</button>
        }
      </div>

      <div class="masonry">
        @for (item of filtered(); track item.src; let i = $index) {
          <figure class="cell" (click)="open(i)">
            <img [src]="item.src" [alt]="item.title" loading="lazy" />
            <figcaption>
              <span class="t">{{ item.title }}</span>
              <span class="tag">{{ item.tag }}</span>
            </figcaption>
            <span class="zoom"><i class="pi pi-search-plus"></i></span>
          </figure>
        }
      </div>
    </div>

    <p-galleria
      [value]="filteredArr"
      [(visible)]="lightbox"
      [(activeIndex)]="active"
      [fullScreen]="true"
      [circular]="true"
      [showThumbnails]="false"
      [showItemNavigators]="true">
      <ng-template #item let-img>
        <img [src]="img.src" [alt]="img.title" style="max-width:92vw;max-height:80vh;object-fit:contain" />
      </ng-template>
    </p-galleria>
  `,
  styles: [`
    .page-hero { background: var(--sk-cream-2); padding-block: clamp(2.5rem,6vw,4rem); }
    .body { padding-block: 2.5rem 4rem; }
    .tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.8rem; }
    .tabs button { border: 1px solid var(--sk-sand); background: #fff; border-radius: 999px; padding: .5rem 1rem; font-weight: 600; font-size: .88rem; cursor: pointer; color: var(--sk-ink); }
    .tabs button:hover { border-color: var(--sk-ember); }
    .tabs button.on { background: var(--sk-iron); color: #fff; border-color: var(--sk-iron); }
    .masonry { columns: 3; column-gap: 1rem; }
    .cell { position: relative; margin: 0 0 1rem; break-inside: avoid; border-radius: var(--sk-radius); overflow: hidden; cursor: pointer; box-shadow: var(--sk-shadow-soft); }
    .cell img { width: 100%; display: block; transition: transform .4s ease; }
    .cell:hover img { transform: scale(1.05); }
    .cell figcaption { position: absolute; inset: auto 0 0 0; padding: 1rem; background: linear-gradient(transparent, rgba(20,15,12,.85)); color: #fff; display: flex; flex-direction: column; }
    .cell .t { font-family: var(--sk-font-display); font-size: 1.05rem; }
    .cell .tag { font-size: .75rem; opacity: .85; }
    .zoom { position: absolute; top: .8rem; right: .8rem; width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,.9); display: grid; place-items: center; opacity: 0; transition: opacity .2s; color: var(--sk-iron); }
    .cell:hover .zoom { opacity: 1; }
    @media (max-width: 860px) { .masonry { columns: 2; } }
    @media (max-width: 520px) { .masonry { columns: 1; } }
  `]
})
export class GalleryComponent {
  protected tag = signal<string>('all');
  protected tags = [...new Set(GALLERY.map((g) => g.tag))];

  protected filtered = computed<GalleryItem[]>(() =>
    this.tag() === 'all' ? GALLERY : GALLERY.filter((g) => g.tag === this.tag())
  );

  protected get filteredArr(): GalleryItem[] { return this.filtered(); }

  protected lightbox = false;
  protected active = 0;

  open(i: number) {
    this.active = i;
    this.lightbox = true;
  }
}
