import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import socialsRouter from './routes/socials.js';
import logInUser from './middlewear/auth.js'
import cartRouter from './routes/cart.js'
import cookieParser from 'cookie-parser';
config();

const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.use(express.json());
app.use(cookieParser());
app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/login',logInUser,loginRouter);
app.use('/post',socialsRouter);
app.use('/cart',cartRouter);

// app.get('/cart',async(req, res)=>{
//     try{
//         res.send(await getCartWithProductInfo())
//     }catch (error){
//         console.error('Error fetching users', error);
//         res.status(500).send("Error fetching users");
//     }
// })

// app.get('/cart/:userId',loginUser, async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const cartItems = await getUserCartWithProductInfo(userId);
//         res.json(cartItems);
//     } catch (error) {
//         console.error('Error fetching user cart:', error);
//         res.status(500).send('Error fetching user cart');
//     }
// });

// app.post('/cart/:productId', authenticateUserMiddleware, async (req, res) => {
//     const userId = req.userId; // Get the user ID from the request object
//     if (!userId) {
//         return res.status(401).json({ message: 'User not authenticated' });
//     }

//     try {
//         const productId = req.params.productId;
//         await addToCart(productId, req);

//         res.status(201).json({ message: 'Product added to cart successfully.' });
//     } catch (error) {
//         console.error('Error adding product to cart:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// app.delete('/cart/:cartId', async (req, res) => {
//     const cartId = req.params.cartId;
//     try {
//         await removeFromCart(cartId);
//         const cart = await getCart();
//         res.send({ msg: 'Item deleted successfully from cart', cart });
//     } catch (error) {
//         console.error('Error deleting item from cart:', error);
//         res.status(500).send('Error deleting item from cart');
//     }
// });

app.listen(PORT, ()=>{
    console.log(`http://localhost:`+PORT);
});
