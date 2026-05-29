import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products.data';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products = PRODUCTS;

  getAll(): Product[] {
    return this.products;
  }

  getFeatured(): Product[] {
    return this.products.filter((p) => p.featured);
  }

  getBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  getById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getRelated(product: Product, limit = 3): Product[] {
    return this.products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, limit);
  }

  getCategories(): { value: ProductCategory; label: string }[] {
    const seen = new Map<ProductCategory, string>();
    for (const p of this.products) {
      if (!seen.has(p.category)) seen.set(p.category, p.categoryLabel);
    }
    return [...seen.entries()].map(([value, label]) => ({ value, label }));
  }
}
