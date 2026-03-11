export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
}

export interface InventoryResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}