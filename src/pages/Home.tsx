import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl font-bold text-gray-900">
          Inventory Management System
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Manage your product inventory efficiently with our comprehensive management system
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Products
        </Link>
      </div>
    </div>
  );
}

