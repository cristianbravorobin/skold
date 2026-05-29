import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sk-contact',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, TextareaModule, SelectModule],
  template: `
    <header class="page-hero">
      <div class="sk-container">
        <span class="sk-eyebrow">Contacto</span>
        <h1 class="sk-title">Hablemos de tu calefacción</h1>
        <p class="sk-lead">¿Dudas con el modelo o la potencia? Cuéntanos sobre tu espacio y te asesoramos sin compromiso.</p>
      </div>
    </header>

    <div class="sk-container layout">
      <!-- Info -->
      <aside class="info">
        <a class="ic-row" href="https://wa.me/56938659397" target="_blank" rel="noopener">
          <span class="ic wa"><i class="pi pi-whatsapp"></i></span>
          <div><strong>WhatsApp</strong><span>+56 9 3865 9397</span></div>
        </a>
        <a class="ic-row" href="mailto:contacto@skold.cl">
          <span class="ic"><i class="pi pi-envelope"></i></span>
          <div><strong>Email</strong><span>contacto&#64;skold.cl</span></div>
        </a>
        <a class="ic-row" href="https://www.instagram.com/skold_estufaspellet/" target="_blank" rel="noopener">
          <span class="ic"><i class="pi pi-instagram"></i></span>
          <div><strong>Instagram</strong><span>&#64;skold_estufaspellet</span></div>
        </a>
        <div class="hours">
          <i class="pi pi-clock"></i> Respondemos en menos de 24 horas hábiles.
        </div>
      </aside>

      <!-- Form -->
      <form class="form" (submit)="submit($event)">
        <div class="two">
          <div class="f"><label>Nombre</label><input pInputText [(ngModel)]="f.name" name="name" placeholder="Tu nombre" /></div>
          <div class="f"><label>Teléfono</label><input pInputText [(ngModel)]="f.phone" name="phone" placeholder="+56 9 …" /></div>
        </div>
        <div class="two">
          <div class="f"><label>Email</label><input pInputText [(ngModel)]="f.email" name="email" placeholder="tucorreo@email.cl" /></div>
          <div class="f"><label>¿Qué necesitas?</label>
            <p-select [options]="topics" [(ngModel)]="f.topic" name="topic" optionLabel="label" optionValue="value" placeholder="Selecciona" styleClass="w-full" appendTo="body" />
          </div>
        </div>
        <div class="f"><label>Metros cuadrados a calefaccionar (aprox.)</label><input pInputText [(ngModel)]="f.m2" name="m2" placeholder="Ej: 80 m²" /></div>
        <div class="f"><label>Mensaje</label><textarea pTextarea [(ngModel)]="f.message" name="message" rows="4" placeholder="Cuéntanos sobre tu hogar y tu necesidad"></textarea></div>
        <p-button type="submit" label="Enviar consulta" icon="pi pi-send" size="large" />
        <p class="alt">o escríbenos directo por <a href="https://wa.me/56938659397" target="_blank" rel="noopener">WhatsApp</a>.</p>
      </form>
    </div>
  `,
  styles: [`
    .page-hero { background: var(--sk-cream-2); padding-block: clamp(2.5rem,6vw,4rem); }
    .layout { display: grid; grid-template-columns: 320px 1fr; gap: 2.5rem; padding-block: 2.5rem 4rem; align-items: start; }
    .info { display: flex; flex-direction: column; gap: 1rem; }
    .ic-row { display: flex; align-items: center; gap: .9rem; background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius); padding: 1rem; }
    .ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: rgba(226,87,30,.1); color: var(--sk-ember-deep); font-size: 1.2rem; }
    .ic.wa { background: rgba(37,211,102,.15); color: #1aa34a; }
    .ic-row strong { display: block; font-size: .95rem; }
    .ic-row span { font-size: .85rem; color: var(--sk-muted); }
    .hours { font-size: .85rem; color: var(--sk-muted); background: rgba(226,87,30,.07); padding: .9rem; border-radius: 12px; }
    .hours i { color: var(--sk-ember-deep); margin-right: .4rem; }
    .form { background: #fff; border: 1px solid rgba(42,37,33,.08); border-radius: var(--sk-radius-lg); padding: 1.8rem; box-shadow: var(--sk-shadow-soft); }
    .two { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .f { margin-bottom: 1rem; }
    .f label { display: block; font-weight: 700; font-size: .82rem; color: var(--sk-muted); margin-bottom: .4rem; }
    .f input, .f textarea { width: 100%; }
    .alt { margin-top: 1rem; color: var(--sk-muted); font-size: .9rem; }
    .alt a { color: var(--sk-ember-deep); font-weight: 600; }
    :host ::ng-deep .w-full { width: 100%; }
    @media (max-width: 860px) { .layout { grid-template-columns: 1fr; } .two { grid-template-columns: 1fr; } }
  `]
})
export class ContactComponent {
  private msg = inject(MessageService);
  protected f = { name: '', phone: '', email: '', topic: null, m2: '', message: '' };
  protected topics = [
    { label: 'Asesoría para elegir modelo', value: 'asesoria' },
    { label: 'Cotización', value: 'cotizacion' },
    { label: 'Instalación', value: 'instalacion' },
    { label: 'Servicio técnico / postventa', value: 'postventa' },
    { label: 'Otro', value: 'otro' }
  ];

  submit(e: Event) {
    e.preventDefault();
    if (!this.f.name || !this.f.email || !this.f.message) {
      this.msg.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Completa nombre, email y mensaje.', life: 2600 });
      return;
    }
    // Demo: en producción, enviar a un backend / correo / CRM.
    this.msg.add({ severity: 'success', summary: '¡Mensaje enviado!', detail: 'Te contactaremos muy pronto.', life: 3000 });
    this.f = { name: '', phone: '', email: '', topic: null, m2: '', message: '' };
  }
}
