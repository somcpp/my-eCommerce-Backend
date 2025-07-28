import { User } from "../models/user.model.js";
import crypto from "crypto";
export const createUser = async (req, res) => {
  try {
    console.log(req.body)
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword,salt });
        const doc = await user.save();
        res.status(201).json({ id: doc.id, role: doc.role });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

export const loginUser = async (req, res) => {
  res.json(req.user);
};

export const checkUser = async (req, res) => {
  res.json(req.user);
};
