import type { Product } from '../types/product';

const STORAGE_KEYS = {
  ADDED_PRODUCTS: 'inventory_added_products',
  EDITED_PRODUCTS: 'inventory_edited_products',
  DELETED_IDS: 'inventory_deleted_ids',
} as const;

export function getAddedProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ADDED_PRODUCTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAddedProduct(product: Product): void {
  const products = getAddedProducts();
  products.push(product);
  localStorage.setItem(STORAGE_KEYS.ADDED_PRODUCTS, JSON.stringify(products));
}

export function getEditedProducts(): Record<number, Product> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.EDITED_PRODUCTS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function saveEditedProduct(product: Product): void {
  const edited = getEditedProducts();
  edited[product.id] = product;
  localStorage.setItem(STORAGE_KEYS.EDITED_PRODUCTS, JSON.stringify(edited));
}

export function getDeletedIds(): Set<number> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DELETED_IDS);
    return data ? new Set(JSON.parse(data)) : new Set();
  } catch {
    return new Set();
  }
}

export function saveDeletedId(id: number): void {
  const deleted = getDeletedIds();
  deleted.add(id);
  localStorage.setItem(STORAGE_KEYS.DELETED_IDS, JSON.stringify([...deleted]));
}

export function applyLocalChanges(products: Product[]): Product[] {
  const added = getAddedProducts();
  const edited = getEditedProducts();
  const deleted = getDeletedIds();

  // Remove deleted products
  let filtered = products.filter(p => !deleted.has(p.id));

  // Apply edits
  filtered = filtered.map(p => edited[p.id] || p);

  // Add new products
  return [...filtered, ...added];
}

