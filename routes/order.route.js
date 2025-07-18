import express from 'express';
import { createOrder, deleteOrder, fetchOrdersByUser, updateOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/',createOrder);
router.get('/',fetchOrdersByUser);
router.delete('/:id',deleteOrder);
router.patch('/:id',updateOrder);

export default router;