import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchFilter from '../components/SearchFilter';
import ProductTable from '../components/ProductTable';
import ProductForm from '../components/ProductForm';
import Pagination from '../components/Pagination';
import { Button } from '../components/ui/button';
import { useProducts, useCategories, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import type { ProductFilters, Product, ProductFormData } from '../types/product';
import { Plus } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Get filters from URL params
  const filters: ProductFilters = {
    q: searchParams.get('q') || undefined,
    category: searchParams.get('category') || undefined,
    sortBy: (searchParams.get('sortBy') as 'price' | 'stock') || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || undefined,
    limit: ITEMS_PER_PAGE,
    skip: (parseInt(searchParams.get('page') || '1') - 1) * ITEMS_PER_PAGE,
  };

  const { data, isLoading, error } = useProducts(filters);
  const { data: categories = [] } = useCategories();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 1;

  const handleFiltersChange = (newFilters: ProductFilters) => {
    const params = new URLSearchParams();
    if (newFilters.q) params.set('q', newFilters.q);
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.sortBy) params.set('sortBy', newFilters.sortBy);
    if (newFilters.order) params.set('order', newFilters.order);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
          console.error( 'error deleting product', error);
        alert('Failed to delete product. Please try again.');
      }
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      if (editingProduct) {
        await updateMutation.mutateAsync({ id: editingProduct.id, data });
      } else {
        await createMutation.mutateAsync(data);
      }
      setIsFormOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error( 'error updating/creating product', error);
      alert(`Failed to ${editingProduct ? 'update' : 'create'} product. Please try again.`);
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden container mx-auto px-4 py-6">
        <SearchFilter
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categories={Array.isArray(categories) ? categories : []}
        />

        <div className="mt-6 bg-white rounded-lg shadow-sm border flex flex-col flex-1 min-h-0">
          <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            <Button onClick={handleAddProduct}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex-shrink-0">
              <p className="font-medium">Error loading products</p>
              <p className="text-sm">Please try refreshing the page.</p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto min-h-0">
            <ProductTable
              products={data?.products || []}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              isLoading={isLoading}
            />
          </div>

          {data && data.products.length > 0 && (
            <div className="flex-shrink-0 border-t">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                limit={ITEMS_PER_PAGE}
                total={data.total}
              />
            </div>
          )}
        </div>
      </div>

      <ProductForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        product={editingProduct}
        categories={Array.isArray(categories) ? categories : []}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

