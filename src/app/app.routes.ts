import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
    title: 'Skold · Estufas a Pellet — Calor forjado para el Sur'
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalog.component').then((m) => m.CatalogComponent),
    title: 'Catálogo · Skold'
  },
  {
    path: 'producto/:slug',
    loadComponent: () => import('./pages/product-detail.component').then((m) => m.ProductDetailComponent),
    title: 'Producto · Skold'
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/cart.component').then((m) => m.CartComponent),
    title: 'Carrito · Skold'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout.component').then((m) => m.CheckoutComponent),
    title: 'Checkout · Skold'
  },
  {
    path: 'checkout/resultado',
    loadComponent: () => import('./pages/checkout-result.component').then((m) => m.CheckoutResultComponent),
    title: 'Resultado del pago · Skold'
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/gallery.component').then((m) => m.GalleryComponent),
    title: 'Galería · Skold'
  },
  {
    path: 'resenas',
    loadComponent: () => import('./pages/reviews.component').then((m) => m.ReviewsComponent),
    title: 'Reseñas · Skold'
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about.component').then((m) => m.AboutComponent),
    title: 'Nosotros · Skold'
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact.component').then((m) => m.ContactComponent),
    title: 'Contacto · Skold'
  },
  { path: '**', redirectTo: '' }
];
