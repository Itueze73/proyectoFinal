import { Router } from 'express';
import { getAllProducts, getProductById, createProduct, deleteProduct, updateProduct, patchProduct } from '../controller/products.controller.js';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);
router.patch('/:id', patchProduct);

export default router;