import express from 'express';
import { createBrand, fetchBrands } from '../controller/brand.controller.js';

const router = express.Router();

router.get('/',fetchBrands);
router.post('/',createBrand)

export default router;