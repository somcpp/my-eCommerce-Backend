import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import userRouter from './routes/Users.route.js';
import authRouter from './routes/Auth.route.js'
import productsRouter from './routes/Product.route.js';
import categoriesRouter from './routes/Category.route.js'
import brandsRouter from './routes/Brands.route.js'
import cartsRouter from './routes/Cart.route.js';
import ordersRouter from './routes/order.route.js';

const app = express();
const port = 8080;

//  Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())
//  Connect to MongoDB
async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
}
main();

// Routes
app.use('/products', productsRouter);
app.use('/categories',categoriesRouter);
app.use('/brands',brandsRouter);
app.use('/users', userRouter);
app.use('/auth',authRouter);
app.use('/cart',cartsRouter);
app.use('/orders',ordersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
