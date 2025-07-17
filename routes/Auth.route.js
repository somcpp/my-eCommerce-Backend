import express from 'express';
import { createUser, loginUser } from '../controller/Auth.controller.js';

const router = express.Router();

router.post('/signup',createUser).post('/login',loginUser);

export default router;