import {pool} from '../config/config.js'

const getCartWithProductInfo = async () => {
    try {
        // Query the database to retrieve cart items with product information
        const query = `
            SELECT c.*, p.* 
            FROM cart c 
            INNER JOIN products p ON c.product_id = p.prodid
        `;
        const [cartItems] = await pool.query(query);
        return cartItems;
    } catch (error) {
        console.error('Error retrieving cart with product information:', error);
        throw error;
    }
};
     const addToCart = async (userId, product_id) => {
        try {
            // Execute the database query to add the product to the cart
            const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
            const values = [userId, product_id];
            const result = await pool.query(query, values);
    
            // Return the result
            return result;
        } catch (error) {
            // Handle database errors
            console.error('Error adding product to cart:', error);
            throw new Error('Internal server error');
        }
    };


// Get user's cart
const getUserCartWithProductInfo = async (userId) => {
    try {
        // Query the database to retrieve user's cart items with product information
        const query = `
            SELECT c.*, p.* 
            FROM cart c 
            INNER JOIN products p ON c.product_id = p.prodid
            WHERE c.user_id = ?
        `;
        const [cartItems] = await pool.query(query, [userId]);
        return cartItems;
    } catch (error) {
        console.error('Error retrieving user cart with product information:', error);
        throw error;
    }
};


// Update cart item quantity
const updateCartItemQuantity = async (cartId, quantity) => {
    await pool.query(`UPDATE cart SET quantity = ? WHERE cart_id = ?`, [quantity, cartId]);
};

// Remove item from cart
const removeFromCart = async (cartId) => {
    await pool.query(`DELETE FROM cart WHERE cart_id = ?`, [cartId]);
};

export {addToCart,getUserCartWithProductInfo,updateCartItemQuantity,removeFromCart,getCartWithProductInfo}