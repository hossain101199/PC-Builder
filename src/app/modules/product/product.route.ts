import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);

export const productsRoutes = router;
