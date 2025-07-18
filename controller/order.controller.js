import { Order } from "../models/order.model.js";

export const fetchOrdersByUser = async (req,res) => {
    const {user} = req.query;
    try{
        const orders = await Order.find({user:user})
        res.status(200).json(orders);
    } catch (err){
        res.status(400).json(err)
    }
}

export const createOrder = async (req,res) => {
    const order = new Order(req.body);
    try{
        const doc = await order.save();
        res.status(201).json(doc);
    } catch(err){
        res.status(400).json(err);
    }
}

export const updateOrder = async (req,res) => {
    const {id} = req.params;
    try{
        const order = await order.findByIdAndUpdate(id,req.body, {
            new: true
        });
        res.status(200).json(order);
    } catch(err) {
        res.status(400).json(err);
    }
}

export const deleteOrder = async (req,res) => {
    const {id} = req.params;
    try{
        const order = await Order.findByIdAndUpdate(id);
        res.status(400).json(order);
    } catch(err){
        res.status(400).json(err);
    }
}