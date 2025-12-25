import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
          Inventory Panel
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            to="/products"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}

