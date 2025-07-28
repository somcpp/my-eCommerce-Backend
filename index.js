import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session'
import passport from 'passport';
import LocalStrategy from 'passport-local'

import userRouter from './routes/Users.route.js';
import authRouter from './routes/Auth.route.js'
import productsRouter from './routes/Product.route.js';
import categoriesRouter from './routes/Category.route.js'
import brandsRouter from './routes/Brands.route.js'
import cartsRouter from './routes/Cart.route.js';
import ordersRouter from './routes/order.route.js';
import { User } from './models/user.model.js';

const app = express();
const port = 8080;

//  Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  
}));
app.use(passport.authenticate('session'));
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
app.use('/products',isAuth, productsRouter);
app.use('/categories',categoriesRouter);
app.use('/brands',brandsRouter);
app.use('/users', userRouter);
app.use('/auth',authRouter);
app.use('/cart',cartsRouter);
app.use('/orders',ordersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
function isAuth(req,res,done){
  if(req.user){
    done();
  }else{
    res.send(401)
  }
}
// Start the server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});

//passport strategies
passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
            const user =await User.findOne({email: username}).exec();
    
            console.log({user});
            if(!user) {
              done(null,false,{message: 'no such user email'})
            } else if (user.password === password) {
                done(null,user)
            } else{
                done(null,false, {message: 'invalid credentials'})
            }
        } catch(err) {
            res.status(400).json(err);
        }
  }
));
//this creates session variable req.user on being called from callbacks
passport.serializeUser(function(user, cb) {
  console.log("serialize",user)
  process.nextTick(function() {
    return cb(null, user);
  });
});
//this creates session variable req.user when called from authorised requests.
passport.deserializeUser(function(user, cb) {
  console.log("deserialise",user)
  process.nextTick(function() {
    return cb(null, {id:user.id,role: user.role});
  });
});