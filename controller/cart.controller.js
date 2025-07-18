import { Cart} from "../models/cart.model.js";

export async function fetchCartByUser(req,res) {
    const {user} = req.query;
    try {
        const cartitems = await Cart.find({user:user}).populate('product');
        res.status(200).json(cartitems);
    } catch(err) {
        res.status(400).json(err);
    }
};

export async function addToCart(req, res) {
    const cartItem = new Cart(req.body);  // ✅ Use Cart (model), not cart (instance)
    console.log(cartItem)
    try {
        const doc = await cartItem.save();
        const result = await doc.populate('product');
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}


export async function updateCart(req,res) {
    const {id} = req.params;
    try{
        const cart = await Cart.findByIdAndUpdate(id,req.body, {
            new: true,
        });
        const result =await cart.populate('product');
        res.status(200).json(result);
    } catch(err){
        res.status(400).json(err);
    }
}

export async function deleteFromCart(req,res) {
    const {id} = req.params;
    try{
        const doc = await Cart.findByIdAndDelete(id);
        res.status(200).json(doc);
    } catch(err) {
        res.status(400).json(err);
    }
}