export interface GalleryItem {
  src: string;
  title: string;
  tag: string;
}

export const GALLERY: GalleryItem[] = [
  { src: 'img/ig-lifestyle.jpg', title: 'Tu terraza al atardecer', tag: 'Exterior' },
  { src: 'img/ig-tower-patio.jpg', title: 'Torre de llama en el patio', tag: 'Exterior' },
  { src: 'img/ig-flame-detail.jpg', title: 'Detalle de la combustión', tag: 'Productos' },
  { src: 'img/ig-tower-tall.jpg', title: 'Columna de fuego vertical', tag: 'Productos' },
  { src: 'img/ig-tower-man.jpg', title: 'Calor para tu terraza', tag: 'Instalaciones' },
  { src: 'img/ig-tower-indoor.jpg', title: 'Detalle de la estructura', tag: 'Productos' },
  { src: 'img/ig-test.jpg', title: 'Prueba de funcionamiento', tag: 'Taller' },
  { src: 'img/ig-workshop.jpg', title: 'Cada estufa se prueba', tag: 'Taller' },
  { src: 'img/ig-flame.jpg', title: 'Pura llama', tag: 'Productos' },
  { src: 'img/ig-maker.jpg', title: 'Hecho a mano en Temuco', tag: 'Taller' }
];
