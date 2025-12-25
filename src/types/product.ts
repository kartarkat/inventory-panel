export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
  rating?: number;
  thumbnail?: string;
  images?: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export interface ProductFilters {
  q?: string;
  category?: string;
  sortBy?: 'price' | 'stock';
  order?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
}

export interface Category {
  slug: string;
  name: string;
}