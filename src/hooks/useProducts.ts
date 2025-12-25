import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct } from '../lib/api';
import { saveAddedProduct, saveEditedProduct, saveDeletedId, applyLocalChanges } from '../lib/localStorage';
import type { ProductFilters, ProductFormData } from '../types/product';

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    select: (data) => ({
      ...data,
      products: applyLocalChanges(data.products),
    }),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      saveAddedProduct(data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductFormData> }) =>
      updateProduct(id, data),
    onSuccess: (data) => {
      saveEditedProduct(data);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (_, id) => {
      saveDeletedId(id);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

