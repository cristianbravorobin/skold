export type ProductCategory = 'estufa' | 'exterior' | 'insertable' | 'caldera' | 'accesorio' | 'pellet';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  /** Etiqueta corta de categoría para UI */
  categoryLabel: string;
  tagline: string;
  description: string;
  price: number;
  /** Precio anterior, si está en oferta */
  oldPrice?: number;
  /** Potencia térmica en kW */
  powerKw: number;
  /** Superficie que calienta, en m² */
  coverageM2: number;
  /** Capacidad de la tolva en kg */
  hopperKg: number;
  color: string;
  badges: string[];
  features: string[];
  specs: ProductSpec[];
  images: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  featured?: boolean;
}
