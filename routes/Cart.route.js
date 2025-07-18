import express from 'express'
import { addToCart, deleteFromCart, fetchCartByUser, updateCart } from '../controller/cart.controller.js'

const router = express.Router();

router.post('/',addToCart);
router.get('/',fetchCartByUser);
router.patch('/:id',updateCart);
router.delete('/:id',deleteFromCart);

export default router; 