export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  productName?: string;
  verified: boolean;
  avatarColor: string;
}
