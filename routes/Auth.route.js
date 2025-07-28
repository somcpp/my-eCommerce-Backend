import express from 'express';
import passport from 'passport'
import { checkUser, createUser, loginUser } from '../controller/Auth.controller.js';

const router = express.Router();

router.post('/signup',createUser).post('/login',passport.authenticate('local'),loginUser);
router.get('/check',checkUser)

export default router;