import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CommitTransactionResponse,
  CreateTransactionRequest,
  CreateTransactionResponse
} from '../models/order.model';

/**
 * Habla con el backend de pagos (server/). En desarrollo, las llamadas a /api
 * se redirigen al backend Express vía proxy.conf.json (puerto 3000).
 */
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/checkout';

  /** Genera un identificador de orden (máx 26 chars en Webpay). */
  newBuyOrder(): string {
    return 'SK-' + Date.now().toString(36).toUpperCase() + '-' +
      Math.floor(Math.random() * 1000);
  }

  create(req: CreateTransactionRequest): Observable<CreateTransactionResponse> {
    return this.http.post<CreateTransactionResponse>(`${this.base}/create`, req);
  }

  commit(token: string): Observable<CommitTransactionResponse> {
    return this.http.post<CommitTransactionResponse>(`${this.base}/commit`, { token });
  }
}
