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
    res.json(req.user)
};

export const checkUser = async (req,res) => {
    res.json(req.user)
}