import { verifyToken } from '../middlewear/auth.js'
import {addToCart,getUserCartWithProductInfo,updateCartItemQuantity,removeFromCart,getCartWithProductInfo,} from '../models/cart.js'



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
            // Extract token from request headers or cookies
            const token = req.headers.authorization || req.cookies.jwt;
            
            // Logging the token to ensure it's correctly extracted
            console.log('Token:', token);
    
            // Verify the token
            const { userId } = verifyToken;
    
            // Logging the userId to check if it's correctly extracted
            console.log('Verified User ID:', userId);
    
            // If token is valid, proceed with adding the product to the cart
            const { product_id } = req.params;
            const result = await addToCart(userId, product_id);
    
            // Send success response
            return res.status(201).json(result);
        } catch (error) {
            // Handle any errors
            console.error('Error adding product to cart:', error);
            return res.status(500).json({ msg: 'Internal server error' });
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