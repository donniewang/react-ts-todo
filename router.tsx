import * as React from 'react';
import { lazy } from 'react';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));

const routes = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '*',
    loader: () => redirect('/home'),
  },
]);

export default function Router() {
  return <RouterProvider router={routes} />;
}
