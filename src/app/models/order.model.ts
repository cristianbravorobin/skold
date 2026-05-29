import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  rut: string;
  region: string;
  city: string;
  address: string;
  notes?: string;
}

export type ShippingMethod = 'despacho' | 'retiro';

export interface CreateTransactionRequest {
  buyOrder: string;
  sessionId: string;
  amount: number;
  returnUrl: string;
}

export interface CreateTransactionResponse {
  token: string;
  url: string;
}

export interface CommitTransactionResponse {
  status: string;
  buyOrder: string;
  amount: number;
  authorizationCode?: string;
  paymentTypeCode?: string;
  cardNumber?: string;
  transactionDate?: string;
  responseCode?: number;
}
