import {addToCart,getUserCartWithProductInfo,updateCartItemQuantity,removeFromCart,getCartWithProductInfo,} from '../models/cart.js'
import { getProducts } from '../models/products.js';
import { verifyToken } from '../middlewear/auth.js';

export default {
    geCart:async(req, res)=>{
        try{
            res.send(await getCartWithProductInfo())
        }catch (error){
            console.error('Error fetching users', error);
            res.status(500).send("Error fetching users");
        }
    },
    getUserCart: async (req, res) => {
        const userId = req.params.userId;
        try {
            const cartItems = await getUserCartWithProductInfo(userId);
            res.json(cartItems);
        } catch (error) {
            console.error('Error fetching user cart:', error);
            res.status(500).send('Error fetching user cart');
        }
    },
     addToCart: async (req, res) => {
        try {
            console.log(req.body.token);

            // Extract token from request headers or cookies
            // const token = req.headers.authorization || req.cookies.jwt;
            const token = req.body.token;
            
            // Verify the token and extract user ID
            const userId = verifyToken(token);
    
            // Extract product ID from request parameters
            const { product_id } = req.params;
    
            // Fetch product details from the database
            const product = await getProducts(product_id);
    
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            // Add product to the user's cart
            const result = await addToCart(userId, product_id);
    
            // Send success response
            return res.status(201).json({ message: 'Product added to cart successfully', result });
        } catch (error) {
            // Handle any errors
            console.error('Error adding product to cart:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    deleteCart: async (req, res) => {
        const cartId = req.params.cartId;
        try {
            await removeFromCart(cartId);
            const cart = await getCartWithProductInfo ();
            res.send({ msg: 'Item deleted successfully from cart', cart });
        } catch (error) {
            console.error('Error deleting item from cart:', error);
            res.status(500).send('Error deleting item from cart');
        }
    }
}