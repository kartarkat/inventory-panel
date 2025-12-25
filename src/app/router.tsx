import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

