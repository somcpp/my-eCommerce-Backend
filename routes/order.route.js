import express from 'express';
import { createOrder, deleteOrder, fetchAllOrders, fetchOrdersByUser, updateOrder } from '../controller/order.controller.js';

const router = express.Router();

router.post('/',createOrder);
router.get('/user/:userId',fetchOrdersByUser);
router.get('/',fetchAllOrders);
router.delete('/:id',deleteOrder);
router.patch('/:id',updateOrder);


export default router;