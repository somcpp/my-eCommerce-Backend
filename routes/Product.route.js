import express from 'express';
import { createProduct, fetchAllProducts,fetchProductById,updateProduct } from '../controller/Product.controller.js';

const router = express.Router();
console.log("hello route")
router.post('/',createProduct);
router.get('/',fetchAllProducts);
router.get('/:id',fetchProductById);
router.patch('/:id',updateProduct);
export default router;