import { User } from "../models/user.model.js";

export const createUser = async(req,res) => {
    const user = new User(req.body);
    try {
        const doc = await user.save();
        res.status(201).json(doc);
    }catch(err) {
        res.status(400).json(err);
    }
};

export const loginUser = async (req,res) => {
    try {
        const user =await User.findOne({email: req.body.email}).exec();

        console.log({user});
        if(!user) {
            res.status(401).json({message: 'no such user email'});
        } else if (user.password === req.body.password) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                addresses: user.addresses
            });
        } else{
            res.status(401).json({message: 'invalid credentials'});
        }
    } catch(err) {
        res.status(400).json(err);
    }
};