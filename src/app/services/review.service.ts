import { Injectable, computed, signal } from '@angular/core';
import { REVIEWS } from '../data/reviews.data';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly _reviews = signal<Review[]>(REVIEWS);

  readonly reviews = this._reviews.asReadonly();

  readonly average = computed(() => {
    const list = this._reviews();
    if (!list.length) return 0;
    return list.reduce((s, r) => s + r.rating, 0) / list.length;
  });

  readonly count = computed(() => this._reviews().length);

  /** Distribución de estrellas (5 → 1). */
  readonly distribution = computed(() => {
    const list = this._reviews();
    return [5, 4, 3, 2, 1].map((stars) => {
      const n = list.filter((r) => Math.round(r.rating) === stars).length;
      return { stars, count: n, pct: list.length ? (n / list.length) * 100 : 0 };
    });
  });

  add(review: Omit<Review, 'id' | 'date' | 'verified' | 'avatarColor'>): void {
    const colors = ['#c84515', '#2f4f3a', '#e2571e', '#7f2c12', '#1a1614'];
    this._reviews.update((list) => [
      {
        ...review,
        id: 'r' + (list.length + 1) + '-' + Date.now(),
        date: new Date().toISOString().slice(0, 10),
        verified: false,
        avatarColor: colors[list.length % colors.length]
      },
      ...list
    ]);
  }
}
