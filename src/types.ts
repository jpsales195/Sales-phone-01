export interface Product {
  id: string;
  name: string;
  priceFormatted: string;
  priceNumeric: number;
  sku: string;
  description: string;
  imageUrl: string;
  category: string;
  paymentUrl: string;
  badge?: string;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
