import React from 'react';

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

export interface GetProductsArgs {
  search: string;
  category: string;
  page: number;
  limit: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}