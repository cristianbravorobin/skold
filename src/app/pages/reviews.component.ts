import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageService } from 'primeng/api';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'sk-reviews',
  standalone: true,
  imports: [FormsModule, ButtonModule, RatingModule, InputTextModule, TextareaModule, DatePipe, DecimalPipe],
  template: `
    <header class="page-hero">
      <div class="sk-container">
        <span class="sk-eyebrow">Reseñas verificadas</span>
        <h1 class="sk-title">Lo que opinan nuestros clientes</h1>
        <p class="sk-lead">Miles de hogares en Chile ya disfrutan del calor Skold. Estas son sus experiencias reales.</p>
      </div>
    </header>

    <div class="sk-container layout">
      <!-- Resumen + formulario -->
      <aside class="side">
        <div class="score">
          <div class="big">{{ reviews.average() | number:'1.1-1' }}</div>
          <p-rating [ngModel]="reviews.average()" [readonly]="true" />
          <span class="based">{{ reviews.count() }} reseñas</span>
        </div>
        <div class="bars">
          @for (d of reviews.distribution(); track d.stars) {
            <div class="bar">
              <span class="lbl">{{ d.stars }} <i class="pi pi-star-fill"></i></span>
              <div class="track"><div class="fill" [style.width.%]="d.pct"></div></div>
              <span class="num">{{ d.count }}</span>
            </div>
          }
        </div>

        <form class="form" (submit)="submit($event)">
          <h3>Deja tu reseña</h3>
          <label>Tu calificación</label>
          <p-rating [(ngModel)]="form.rating" name="rating" />
          <label>Nombre</label>
          <input pInputText [(ngModel)]="form.author" name="author" placeholder="Tu nombre" />
          <label>Ciudad</label>
          <input pInputText [(ngModel)]="form.location" name="location" placeholder="Ej: Temuco" />
          <label>Título</label>
          <input pInputText [(ngModel)]="form.title" name="title" placeholder="Resume tu experiencia" />
          <label>Comentario</label>
          <textarea pTextarea [(ngModel)]="form.body" name="body" rows="3" placeholder="Cuéntanos cómo ha sido tu experiencia"></textarea>
          <p-button type="submit" label="Publicar reseña" icon="pi pi-send" styleClass="w-full" />
        </form>
      </aside>

      <!-- Lista -->
      <section class="list">
        @for (r of reviews.reviews(); track r.id) {
          <article class="rev">
            <header>
              <span class="av" [style.background]="r.avatarColor">{{ r.author[0] }}</span>
              <div>
                <strong>{{ r.author }}</strong>
                <span class="loc">{{ r.location }} · {{ r.date | date:'longDate' }}</span>
              </div>
              @if (r.verified) { <span class="verified"><i class="pi pi-verified"></i> Compra verificada</span> }
            </header>
            <p-rating [ngModel]="r.rating" [readonly]="true" />
            <h3>{{ r.title }}</h3>
            <p>{{ r.body }}</p>
            @if (r.productName) { <span class="prod"><i class="pi pi-tag"></i> {{ r.productName }}</span> }
          </article>
        }
      </section>
    </div>
  `,
  styles: [`
    .page-hero { background: var(--sk-cream-2); padding-block: clamp(2.5rem,6vw,4rem); }
    .layout { display: grid; grid-template-columns: 320px 1fr; gap: 2rem; padding-block: 2.5rem 4rem; align-items: start; }
    .side { display: flex; flex-direction: column; gap: 1.5rem; }
    .score { background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.6rem; text-align: center; }
    .big { font-family: var(--sk-font-display); font-size: 3.4rem; font-weight: 700; line-height: 1; color: var(--sk-iron); }
    .based { display: block; margin-top: .5rem; color: var(--sk-muted); font-size: .85rem; }
    .bars { background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.2rem; display: flex; flex-direction: column; gap: .5rem; }
    .bar { display: grid; grid-template-columns: 38px 1fr 28px; align-items: center; gap: .5rem; font-size: .82rem; }
    .lbl i { color: #f5a623; font-size: .7rem; }
    .track { height: 8px; background: var(--sk-cream-2); border-radius: 999px; overflow: hidden; }
    .fill { height: 100%; background: var(--sk-ember); border-radius: 999px; }
    .num { text-align: right; color: var(--sk-muted); }
    .form { background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.4rem; display: flex; flex-direction: column; }
    .form h3 { margin-bottom: .8rem; }
    .form label { font-size: .82rem; font-weight: 700; color: var(--sk-muted); margin: .8rem 0 .35rem; }
    .form input, .form textarea { width: 100%; }
    .form ::ng-deep .p-button { margin-top: 1.2rem; }
    .list { display: flex; flex-direction: column; gap: 1rem; }
    .rev { background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.4rem; }
    .rev > header { display: flex; align-items: center; gap: .7rem; margin-bottom: .7rem; }
    .av { width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center; color: #fff; font-weight: 700; }
    .rev header strong { display: block; }
    .loc { font-size: .8rem; color: var(--sk-muted); }
    .verified { margin-left: auto; font-size: .76rem; color: var(--sk-pine); font-weight: 600; }
    .rev h3 { margin: .5rem 0 .3rem; font-size: 1.15rem; }
    .rev p { color: var(--sk-ink); line-height: 1.6; margin: 0; }
    .prod { display: inline-block; margin-top: .8rem; font-size: .8rem; color: var(--sk-muted); background: var(--sk-cream-2); padding: .3rem .7rem; border-radius: 999px; }
    :host ::ng-deep .w-full { width: 100%; }
    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } }
  `]
})
export class ReviewsComponent {
  protected reviews = inject(ReviewService);
  private msg = inject(MessageService);

  protected form = { rating: 5, author: '', location: '', title: '', body: '' };

  submit(e: Event) {
    e.preventDefault();
    if (!this.form.author || !this.form.body || !this.form.title) {
      this.msg.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa nombre, título y comentario.', life: 2600 });
      return;
    }
    this.reviews.add({
      author: this.form.author,
      location: this.form.location || 'Chile',
      rating: this.form.rating,
      title: this.form.title,
      body: this.form.body
    });
    this.msg.add({ severity: 'success', summary: '¡Gracias por tu reseña!', detail: 'Se publicó correctamente.', life: 2800 });
    this.form = { rating: 5, author: '', location: '', title: '', body: '' };
  }
}
