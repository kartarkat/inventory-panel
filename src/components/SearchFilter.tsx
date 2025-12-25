import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import type { Category, ProductFilters } from '../types/product';

interface SearchFilterProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  categories: Category[];
}

export default function SearchFilter({ filters, onFiltersChange, categories }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState(filters.q || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, q: searchQuery || undefined, skip: 0 });
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category: category || undefined, skip: 0 });
  };

  const handleSortChange = (sortBy: 'price' | 'stock') => {
    const currentSort = filters.sortBy === sortBy;
    const currentOrder = filters.order === 'desc';
    
    if (currentSort && currentOrder) {
      // If already sorted desc, remove sort
      onFiltersChange({ ...filters, sortBy: undefined, order: undefined });
    } else if (currentSort) {
      // If sorted asc, change to desc
      onFiltersChange({ ...filters, order: 'desc' });
    } else {
      // New sort, default to asc
      onFiltersChange({ ...filters, sortBy, order: 'asc' });
    }
  };

  console.log('categories', categories)

  return (
    <div className="bg-white border-b p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filters.category || ''} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories && categories.length > 0 && categories.map((cat) => {
              const value = cat?.slug
              const label = cat?.name
              return (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={filters.sortBy === 'price' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('price')}
          >
            Sort by Price {filters.sortBy === 'price' && (filters.order === 'asc' ? '↑' : '↓')}
          </Button>
          <Button
            variant={filters.sortBy === 'stock' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('stock')}
          >
            Sort by Stock {filters.sortBy === 'stock' && (filters.order === 'asc' ? '↑' : '↓')}
          </Button>
        </div>
      </div>
    </div>
  );
}
