import {addToCart,getUserCartWithProductInfo,updateCartItemQuantity,removeFromCart,getCartWithProductInfo,} from '../models/cart.js'

import { getUserId}  from '../middlewear/authUser.js';

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
            const product_id = req.params.product_id;
            const user_id = getUserId(req); // Get user ID from the request (implement this function)
    
            if (!user_id) {
                throw new Error('User not authenticated');
            }
    
            await addToCart(user_id, product_id); // Pass both user_id and product_id
    
            res.status(201).json({ msg: 'Product added to cart successfully.' });
        } catch (error) {
            console.error('Error adding product to cart:', error);
            res.status(500).json({ msg: 'Internal server error' });
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