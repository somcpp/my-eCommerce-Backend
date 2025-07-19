import { Order } from "../models/order.model.js";

export const fetchAllOrders = async (req,res) => {
    let query = Order.find({deleted:{$ne:true}});
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }
    try {
      const docs = await query.exec();
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
}

export const fetchOrdersByUser = async (req,res) => {
    const {userId} = req.params;
    try{
        const orders = await Order.find({user:userId})
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
    console.log(req.body)
    try{
        const order = await Order.findByIdAndUpdate(id,req.body, {
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