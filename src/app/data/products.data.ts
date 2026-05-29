import { Product } from '../models/product.model';

/**
 * Catálogo Skold. El producto es la Torre de Llama: un calefactor a pellet
 * hecho a mano en Temuco, con una columna de fuego visible a través de un tubo de
 * vidrio templado y estructura de acero. Funciona por tiraje natural, sin electricidad.
 * Las especificaciones son referenciales (fabricación artesanal a pedido).
 * Imágenes reales en public/img/ig-*.jpg.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'sk-torre-llama',
    slug: 'torre-de-llama',
    name: 'Torre de Llama Skold',
    category: 'exterior',
    categoryLabel: 'Calefactor a pellet',
    tagline: 'La columna de fuego que calienta y decora tu terraza.',
    description:
      'Nuestro calefactor insignia, forjado y soldado a mano en Temuco. Una espectacular llama vertical sube por un tubo de vidrio templado, calentando tu terraza, patio o quincho mientras se transforma en el centro de la reunión. Funciona por tiraje natural —sin electricidad— y cada pieza se prueba (encendido, combustión y altura de llama) antes de pintarse y llegar a tu hogar.',
    price: 250000,
    powerKw: 7,
    coverageM2: 25,
    hopperKg: 8,
    color: 'Negro forja',
    badges: ['Exterior', 'Sin electricidad', 'Hecho a mano'],
    features: [
      'Llama vertical visible a través de tubo de vidrio templado',
      'Funciona sin conexión eléctrica (tiraje natural)',
      'Estructura de acero soldada a mano',
      'Ideal para terrazas, patios y quinchos',
      'Cada unidad se prueba antes de entregar'
    ],
    specs: [
      { label: 'Potencia', value: '~7 kW (referencial)' },
      { label: 'Uso', value: 'Exterior / semicubierto' },
      { label: 'Combustible', value: 'Pellet de madera' },
      { label: 'Tolva', value: '~8 kg' },
      { label: 'Autonomía', value: 'Hasta 6 h por carga' },
      { label: 'Energía', value: 'No requiere electricidad' },
      { label: 'Material', value: 'Acero al carbono + tubo de vidrio templado' },
      { label: 'Altura', value: '~2 m' },
      { label: 'Fabricación', value: 'Artesanal, a pedido' }
    ],
    images: ['img/ig-lifestyle.jpg', 'img/ig-tower-patio.jpg', 'img/ig-flame-detail.jpg', 'img/ig-tower-tall.jpg'],
    rating: 4.9,
    reviewsCount: 47,
    stock: 12,
    featured: true
  }
];
