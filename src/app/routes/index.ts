import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { categoryRoutes } from '../modules/category/category.route';
import { productsRoutes } from '../modules/product/product.route';

const routes = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/products',
    route: productsRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
