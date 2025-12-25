# Product Inventory Management System

A modern, full-featured Product Inventory Management System built with React, TypeScript, and Vite. This application provides a clean, intuitive interface for managing product inventory with real-time search, filtering, sorting, and CRUD operations.

## 🚀 Features

- **Home Page**: Simple landing page with navigation to products
- **Products Management**: Comprehensive product listing and management
  - Real-time search with debouncing
  - Category filtering
  - Sort by price or stock (ascending/descending)
  - Pagination support
  - Add, Edit, and Delete products
  - Form validation with Zod
  - LocalStorage persistence for added/edited/deleted products
- **404 Page**: Handles unknown routes gracefully
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful messages when no products match filters

## 🧰 Tech Stack

- **Vite** - Fast build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component primitives
- **React Query (@tanstack/react-query)** - Data fetching and caching
- **React Router** - Client-side routing
- **react-hook-form** - Form state management
- **Zod** - Schema validation
- **DummyJSON API** - Mock backend for product data

## 📦 Installation

1. Clone the repository or extract the project folder
2. Install dependencies using pnpm:

```bash
pnpm install
```

## 🏃 Running the Application

### Development Mode

```bash
pnpm dev
```

The application will start on `http://localhost:5173` (or the next available port).

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

## 📂 Project Structure

```
src/
├── app/
│   ├── router.tsx          # React Router configuration
│   └── queryClient.ts      # React Query client setup
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Products.tsx        # Main products management page
│   └── NotFound.tsx        # 404 error page
├── components/
│   ├── ui/                 # Reusable UI components (shadcn-style)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   ├── Header.tsx          # App header with navigation
│   ├── SearchFilter.tsx    # Search, category, and sort controls
│   ├── ProductTable.tsx    # Products table display
│   ├── ProductForm.tsx     # Add/Edit product form
│   └── Pagination.tsx      # Pagination controls
├── hooks/
│   └── useProducts.ts      # React Query hooks for products
├── lib/
│   ├── api.ts              # API functions for DummyJSON
│   ├── localStorage.ts     # LocalStorage persistence utilities
│   └── utils.ts            # Utility functions (cn helper)
├── types/
│   └── product.ts          # TypeScript type definitions
└── main.tsx                # Application entry point
```

## 🎯 Key Features Explained

### Search & Filtering

- **Search**: Debounced search query (300ms) that searches product names and descriptions
- **Category Filter**: Dropdown to filter products by category
- **Sorting**: Toggle sort by price or stock (click once for ascending, twice for descending, third time removes sort)
- All filters update results in real-time via URL query parameters

### Product Management

- **Add Product**: Modal form with validation for all required fields
- **Edit Product**: Click edit icon on any product row to modify it
- **Delete Product**: Click delete icon with confirmation dialog
- **Local Persistence**: All changes are saved to localStorage so they persist across page refreshes

### Data Flow

1. Products are fetched from DummyJSON API
2. LocalStorage changes (adds/edits/deletes) are applied on top of API data
3. React Query handles caching and refetching
4. URL query parameters maintain filter state

## 🔧 API Integration

The application uses the [DummyJSON API](https://dummyjson.com) for product data:

- `GET /products` - List products with filters
- `GET /products/search?q=...` - Search products
- `GET /products/categories` - Get all categories
- `POST /products/add` - Add new product (simulated)
- `PUT /products/{id}` - Update product (simulated)
- `DELETE /products/{id}` - Delete product (simulated)

**Note**: The API endpoints for add/update/delete are simulated and don't persist on the server. All changes are stored in localStorage to provide a realistic user experience.

## ⚙️ Configuration

### Environment Variables

No environment variables are required for basic functionality. The API base URL is hardcoded to `https://dummyjson.com`.

### Pagination

Default items per page: **10**

You can modify this in `src/pages/Products.tsx`:

```typescript
const ITEMS_PER_PAGE = 10;
```

## 🐛 Known Limitations / TODOs

1. **No Backend Persistence**: Since DummyJSON doesn't persist changes, all modifications are stored in localStorage only
2. **No Authentication**: User authentication is not implemented
3. **No Image Upload**: Product images cannot be uploaded (uses API-provided images)
4. **No Bulk Operations**: Cannot select and delete/edit multiple products at once
5. **No Export/Import**: Cannot export or import product data
6. **Limited Validation**: Form validation is basic; could be enhanced with more business rules
7. **No Undo/Redo**: No way to undo accidental deletions or edits

## 📝 Development Notes

- The project uses **pnpm** as the package manager
- All components follow React best practices with proper TypeScript typing
- The codebase is structured for maintainability and scalability
- UI components are built in a shadcn/ui style for consistency
- React Query provides efficient caching and background refetching


## 📄 License

This project is provided as-is for demonstration purposes.
